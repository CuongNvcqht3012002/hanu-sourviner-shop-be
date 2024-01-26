import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailService } from 'src/modules/mail/mail.service'
import { Verification } from 'src/modules/auth/verification.entity'
import { AuthController } from 'src/modules/auth/auth.controller'
import { AuthService } from 'src/modules/auth/auth.service'
import { JwtStrategy } from 'src/modules/auth/jwt.strategy'
import { User } from 'src/modules/user/user.entity'
import { UserService } from 'src/modules/user/user.service'
import { UserModule } from 'src/modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Verification]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.expires'),
        },
      }),
    }),
    UserModule
  ],
  exports: [JwtModule, JwtStrategy],
  controllers: [AuthController],
  providers: [AuthService, MailService, JwtStrategy],
})
export class AuthModule {}
