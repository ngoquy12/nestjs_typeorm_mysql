import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Tên không được phép để trống.' })
  UserName: string;

  @IsNotEmpty({ message: 'Email không được phép để trống.' })
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  Email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được phép để trống.' })
  @MinLength(8, { message: 'Mật khẩu không được ngắn hơn 8 ký tự.' })
  Password: string;
}
