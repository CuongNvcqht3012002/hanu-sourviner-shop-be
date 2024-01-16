import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { STATUS_ENUM } from 'modules/feedbacks/enums/statuses.enum'

export class UpdateStatusDto {
  @ApiProperty({ enum: STATUS_ENUM })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM
}
