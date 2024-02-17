import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional, Min, IsInt } from 'class-validator'
import { CATEGORY_ENUM } from 'src/modules/item/category.enum'

export class CreateItemDto {
  @ApiProperty({ example: 'ItemName' })
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsString()
  name: string

  @ApiProperty({ example: 10.99 })
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ example: 'ItemCode' })
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsString()
  code: string

  @ApiProperty({ example: 100 })
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsInt()
  @Min(0)
  quantity: number

  @ApiProperty({ example: 'Item introduction' })
  @IsOptional()
  @IsString()
  introduction?: string

  @ApiProperty({ example: 'Item description' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: 'CategoryEnumValue' })
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsEnum(CATEGORY_ENUM)
  category: CATEGORY_ENUM
}
