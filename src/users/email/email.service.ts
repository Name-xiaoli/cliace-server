import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, } from '@nestjs/common';
// import path from 'path';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from '../entities/email.entity';


@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Email) private email: Repository<Email>) { }

  /**
   * 发送邮件验证码
   * @param email 邮件
   */
  async sendEmailCode(email: string) {
    console.log(email);

    try {
      const code: string = Math.random()
        .toString()
        .slice(-6);
      console.log(code);

      const date = new Date()
      const sendMailOptions: ISendMailOptions = {
        to: email,
        subject: '用户邮箱验证',
        text: "你的验证码为: " + code + '\n' + date,

      };
      const res = await this.mailerService.sendMail(sendMailOptions);
      console.log(res);
      const data_email = new Email()
      data_email.captcha = code
      data_email.email = email
      //保存邮箱和验证码到数据库
      const haveEmail = await this.email.find({
        where: {
          email: email
        }
      })
      console.log(haveEmail);
      if (haveEmail.length === 0) {
        this.email.save(data_email)
      } else {
        this.email.update(haveEmail[0].id, data_email)
      }


      console.log(`发送邮件给:${email},成功!`);
      return { code: 200, message: '邮件发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
  }
}
