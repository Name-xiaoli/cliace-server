import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class IsPublicLogDto {
  @IsNotEmpty({ message: 'ID不能为空' })
  id:number

  @IsNotEmpty({ message: '是否公开不能为空' })
  isPublic:boolean
}