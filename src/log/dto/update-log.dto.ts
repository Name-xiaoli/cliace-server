import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone,Length } from 'class-validator';

export class UpdateLogDto  {

  @IsNotEmpty({ message: '日记ID不能为空' })
  logId:number

  @IsNotEmpty({ message: '内容不能为空' })
  text:string
}
