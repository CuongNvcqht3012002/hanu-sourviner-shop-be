import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  shippingAddress: string

  @IsNotEmpty({message: "Mục này là bắt buộc"})
  billingAddress: string

  @IsPhoneNumber('VN', { message: 'Invalid phone number format' })
  trackingNumber: string

  @IsOptional()
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  note: string
  // Other order-related properties can be added here if needed.
}
