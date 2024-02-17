import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailService } from 'src/modules/mail/mail.service'
import { Verification } from 'src/modules/auth/verification.entity'
import { AuthController } from 'src/modules/auth/auth.controller'
import { AuthService } from 'src/modules/auth/auth.service'
import { JwtStrategy } from 'src/modules/auth/jwt.strategy'
import { UserModule } from 'src/modules/user/user.module'
import { MailModule } from 'src/modules/mail/mail.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Verification]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          // expiresIn: configService.get('auth.expires'),
          expiresIn: 50000,
        },
      }),
    }),
    UserModule,
    // MailModule
  ],
  exports: [JwtModule, JwtStrategy],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
