import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from 'src/modules/auth/auth.service'
import { EmailRegisterDto } from 'src/modules/auth/dto/email-register.dto'
import { UserLoginDto } from 'src/modules/auth/dto/user-login.dto'

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User - Login' })
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto)

    return this.authService.login(userLoginDto)
  }

  @ApiOperation({ summary: 'User - Create new account' })
  @Post('email/register')
  register(@Body() userRegisterDto: EmailRegisterDto) {
    return this.authService.register(userRegisterDto)
  }

  @ApiOperation({ summary: 'User - Verify account' })
  @Get('confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Query('token') token: string, @Query('email') email: string, @Res() res) {
    const confirmed = await this.authService.confirmEmail(token, email)
    if (confirmed) {
      res.redirect('https://www.youtube.com/watch?v=CRIGj6Qgqiw&ab_channel=BlueSkyMusic')
    } else {
      res.redirect('https://www.youtube.com/watch?v=CRIGj6Qgqiw&ab_channel=BlueSkyMusic')
    }
  }
}
