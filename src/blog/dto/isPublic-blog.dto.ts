import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class IsPublicBlogDto {
  @IsNotEmpty({ message: '标题不能为空' })
  id:number

  @IsNotEmpty({ message: '内容不能为空' })
  isPublic:boolean
}