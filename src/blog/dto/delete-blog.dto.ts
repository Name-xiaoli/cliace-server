import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class DeleteBlogDto {

  @IsNotEmpty({ message: '用户名ID不能为空' })
  userId:number

  @IsNotEmpty({ message: '博客ID不能为空' })
  blogId:number
}