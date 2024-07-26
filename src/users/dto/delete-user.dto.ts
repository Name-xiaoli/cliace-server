import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class DeleteUserDto { 

  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(3, 10,{message:'用户名需满足3~10位'})
  login_name: string
}