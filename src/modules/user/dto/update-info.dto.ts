import { PickType } from '@nestjs/mapped-types'
import { EmailRegisterDto } from 'src/modules/auth/dto/email-register.dto'

export class UpdateInfoDto extends PickType(EmailRegisterDto, [
  'username',
  'firstname',
  'lastname',
] as const) {}
