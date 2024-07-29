import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class DeleteLogDto {

  @IsNotEmpty({ message: '用户名ID不能为空' })
  userId:number

  @IsNotEmpty({ message: '日记ID不能为空' })
  logId:number
}