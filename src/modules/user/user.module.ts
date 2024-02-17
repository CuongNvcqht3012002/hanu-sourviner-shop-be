import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from 'src/modules/user/user.controller'
import { User } from 'src/modules/user/user.entity'
import { UserService } from 'src/modules/user/user.service'
import { Verification } from 'src/modules/auth/verification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
