import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone ,Length} from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(3, 10,{message:'用户名需满足3~10位'})
  login_name: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20,{message:'密码需满足6~20位'})
  passworsd: string
}

export class PWD {
  @IsNotEmpty({ message: '新密码不能为空' })
  @Length(6, 20,{message:'新密码需满足6~20位'})
  passworsd: string
}
