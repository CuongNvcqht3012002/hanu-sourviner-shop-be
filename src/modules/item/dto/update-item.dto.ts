import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateItemDto } from 'src/modules/item/dto/create-item.dto'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  images: string[]
}
