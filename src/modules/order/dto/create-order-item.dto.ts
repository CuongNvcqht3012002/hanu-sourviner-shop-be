import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderItemDto {
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsString()
  name: string

  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsString()
  code: string

  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @IsNumber()
  @IsPositive()
  price: number

  // You can include additional fields related to the order item, such as discounts, tax, etc.
}
