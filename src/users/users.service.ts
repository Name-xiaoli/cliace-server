import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Email } from './entities/email.entity';

import { UpdatePasswordDto,PWD } from './dto/updata-password.dto'


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Email) private email: Repository<Email>) { }

  //注册账号
  async create(createUserDto: CreateUserDto): Promise<Object> {
    const data = new User()
    data.login_name = createUserDto.login_name
    data.passworsd = createUserDto.passworsd
    data.email = createUserDto.email

    //查找是否有这个验证有才能成功注册
    const emailRes = await this.email.find({
      where: {
        email: createUserDto.email,
        captcha: createUserDto.captcha
      }
    })
    console.log(emailRes);
    if (emailRes.length !== 0) {
      const res = await this.user.save(data)
      console.log(res);

      if (res.id !== 0) {
        return {
          message: "注册成功"
        }
      } else {
        return {
          message: "注册失败"
        }
      }
    } else {
      return {
        message: "验证码或QQ邮箱不正确"
      }
    }



  }

  //删除账号
  async remove(deleteUserDto: DeleteUserDto): Promise<Object> {
    const res = await this.user.delete(deleteUserDto);
    console.log(res);
    if (res.affected === 1) {
      return {
        message: "删除成功"
      }
    } else {
      return {
        message: "删除失败"
      }
    }

  }

  //更新个人信息
  async update(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
    const res = await this.user.update(id, updateUserDto)
    console.log(res);
    if (res.affected === 1) {
      return {
        message: "更新成功"
      }
    } else {
      return {
        message: "更新失败"
      }
    }
  }

  //登录
  async findOne(findUserDto: FindUserDto): Promise<User> {
    return await this.user.findOne({
      where: {
        login_name: findUserDto.login_name,
        passworsd: findUserDto.passworsd
      }
    });
  }

  //更新密码
  async updatePwd(data: UpdatePasswordDto, PWD: PWD): Promise<Object> {
    const userRes = await this.user.find({
      where: {
        login_name: data.login_name,
        passworsd: data.passworsd
      }
    })
    console.log(userRes);
    if(userRes[0].id!==0){
      await this.user.update(userRes[0].id,PWD)
      return {
        message:"成功更新密码"
      }
    }else{
      return {
        message:"账号或密码错误"
      }
    }

  }
}
