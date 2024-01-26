import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  shippingAddress: string

  @IsNotEmpty()
  billingAddress: string

  @IsPhoneNumber('VN', { message: 'Invalid phone number format' })
  trackingNumber: string

  @IsOptional()
  @IsNotEmpty()
  note: string
  // Other order-related properties can be added here if needed.
}
