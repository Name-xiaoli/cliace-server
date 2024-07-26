import { ValidateIf, IsNotEmpty, IsString, IsEmail, IsNumber, IsMobilePhone ,Length,Max,Min,IsIn} from 'class-validator';

export class UpdateUserDto {

  @IsNotEmpty({ message: '昵称不能为空' })
  @Length(3, 10,{message:'昵称需满足3~10位'})
  nickname: string

  @Min(1)
  @Max(100)
  @IsNotEmpty({ message: '年龄不能为空' })
  age: number

  
  @IsIn(['男','女'])
  sex: string
 }
