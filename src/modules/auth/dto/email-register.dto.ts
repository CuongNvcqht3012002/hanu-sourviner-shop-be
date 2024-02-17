import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class EmailRegisterDto {
  @ApiProperty({ example: 'Abudabi' })
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  @Transform(({ value }) => value?.toLowerCase())
  @MinLength(5, {message: "Tên đăng nhập phải dài hơn 5 kí tự!"})
  @MaxLength(20, {message: "Tên đăng nhập không được dài hơn 20 kí tự!"})
  username: string

  @ApiProperty({ example: 'test@gmail.com' })
  @Transform(({ value }) => value?.toLowerCase())
  @IsEmail({},{message: "Hãy nhập đúng định dạng email"})
  @IsNotEmpty({message: "Mục này là bắt buộc"})
  email: string

  @ApiProperty()
  @MaxLength(50, {message: "Mật khẩu quá dài?"})
  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1 }, {message: "Mật khẩu phải có ít nhất 8 kí tự bao gồm cả chữ số và chữ viết hoa"})
  password: string

  @ApiProperty()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phoneNumber: string

  @ApiProperty({ example: 'Tai' })
  @IsNotEmpty()
  @IsOptional()
  firstname: string

  @ApiProperty({ example: 'Smile' })
  @IsNotEmpty()
  @IsOptional()
  lastname: string
}
