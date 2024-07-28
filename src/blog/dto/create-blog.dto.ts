import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(2, 20,{message:'标题需满足2~20位'})
  title:string

  @IsNotEmpty({ message: '内容不能为空' })
  text:string

  @IsNotEmpty({ message: '用户名ID不能为空' })
  userId:number
}
