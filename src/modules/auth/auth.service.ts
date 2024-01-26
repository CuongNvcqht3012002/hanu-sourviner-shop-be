import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { nanoid } from 'nanoid'
import { Repository } from 'typeorm'
import { MailService } from 'src/modules/mail/mail.service'
import { EmailRegisterDto } from 'src/modules/auth/dto/email-register.dto'
import { UserLoginDto } from 'src/modules/auth/dto/user-login.dto'
import { Verification } from 'src/modules/auth/verification.entity'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { isEmail } from 'class-validator'
import { User } from 'src/modules/user/user.entity'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  /* Method receives user's register data, create a new user and send verification email*/
  async register(userRegisterDto: EmailRegisterDto) {
    const tokenLength = 6

    // Check exist email and username
    const { email, username } = userRegisterDto
    const userByEmail = await this.userService.findOneBy({ email })
    if (userByEmail) {
      throw new BadRequestException('Email already exists.')
    }
    const userByUsername = await this.userService.findOneBy({ username })
    if (userByUsername) {
      throw new BadRequestException('Username already exists.')
    }

    // Create new user
    await this.userService.create(userRegisterDto);

    // Create verification code
    const verification = new Verification()
    verification.token = nanoid(tokenLength)
    verification.email = userRegisterDto.email

    this.verificationRepository.save(verification)

    // Send email verification
    await this.mailService.verifyEmail(verification.email, verification.token)
    return `Email Verification has been sent to email ${verification.email}. For development, token: ${verification.token}`
  }

  async confirmEmail(token: string, email: string): Promise<boolean> {
    // Validate token
    const verification = await this.verificationRepository.findOneBy({ email })

    if (verification) {
      const user = await this.userService.findOneBy({ email })
      await this.userService.update(user.id, {verified: true})
      await this.verificationRepository.delete({ email })

      return true
    }
    return false
  }

  async login(userLoginDto: UserLoginDto) {
    const { usernameOrEmail, password } = userLoginDto

    let user: User
    if (isEmail(usernameOrEmail))
      user = await this.userService.findOneBy({ email: usernameOrEmail })
    else user = await this.userService.findOneBy({ username: usernameOrEmail })

    if (!user) throw new NotFoundException('Username not exist')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!user.verified) throw new UnauthorizedException('Account not verified')
    if (!isPasswordValid) throw new UnauthorizedException('Wrong password')

    const token = await this._createTokens(user)
    return { ...token, ...user }
  }

  async _createTokens(user: User): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.jwtService.sign({
      id: user.id,
      role: user.role,
      type: 'access',
    })
    const refresh_token = await this.jwtService.sign({
      id: user.id,
      role: user.role,
      type: 'refresh',
    })

    return { access_token, refresh_token }
  }

  // Implement methods for user validation, token generation, etc.
  async validateUser(userId: string): Promise<User> {
    return await this.userService.findOneBy({ id: userId })
  }
}
