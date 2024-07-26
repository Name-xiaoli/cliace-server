import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from './email/email.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) { }

  //注册账户
  @Post('regist')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //删除账户
  @Delete()
  remove(@Body() deleleUserDto: DeleteUserDto) {
    return this.usersService.remove(deleleUserDto);
  }

  //更新账户信息
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //登录
  @Post('login')
  findOne(@Body() findUserDto: FindUserDto) {
    return this.usersService.findOne(findUserDto);
  }

  //生成邮箱验证码并保存
  @Post('email')
  createEmail(@Body('email') email: string) {
    return this.emailService.sendEmailCode(email)
  }
}
