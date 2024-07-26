import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(3, 10,{message:'用户名需满足3~10位'})
  login_name: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20,{message:'密码需满足6~20位'})
  passworsd: string

  @IsNotEmpty({ message: 'QQ邮箱不能为空' })
  @IsEmail({}, { message: 'email格式不正确' })
  email: string

  @IsNotEmpty({ message: '验证码不能为空' })
  captcha:string
}
