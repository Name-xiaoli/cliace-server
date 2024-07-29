import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';


export class CreateLogDto {
  @IsNotEmpty({ message: '内容不能为空' })
  text:string

  @IsNotEmpty({ message: '用户名ID不能为空' })
  userId:number
}
