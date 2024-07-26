import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Email } from './entities/email.entity';

//发送邮件
import { MailerModule } from '@nestjs-modules/mailer';
// import path from 'path';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { EmailService } from './email/email.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Email]),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.qq.com', //邮箱服务器地址
                port: 465, //服务器端口 默认 465
                auth: {
                    user: '3115009928@qq.com',//你的邮箱地址
                    pass: 'mjrshufejaybdefc'
                }
            },
            // preview: true,//是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
            defaults: {
                from: '3115009928@qq.com' //发送人 你的邮箱地址
            }
            // template: {
            //     dir: path.join(process.cwd(), './src/uaers/template'),//这里就是你的ejs模板文件夹路径
            //     adapter: new PugAdapter(),
            //     options: {
            //         strict: true //严格模式
            //     }
            // }
        })
    ],
    controllers: [UsersController],
    providers: [UsersService, EmailService]
})
export class UsersModule { }
