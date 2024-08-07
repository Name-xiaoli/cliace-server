import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//dto校验
import { ValidationPipe, HttpStatus, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局接口数据校验
  // 以下参数均可根据自身需求设置
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 启用参数类型自动转换，常规设置
    whitelist: true, // 监听参数白名单，常规设置
    // 禁止非白名单参数，存在非白名单属性报错。此项可根据需求而定，如果设置false，将剥离非白名单属性
    forbidNonWhitelisted: true, 
    // 设置校验失败后返回的http状态码
    errorHttpStatusCode: HttpStatus.BAD_REQUEST, 
    // 设置校验失败后的响应数据格式
    exceptionFactory: (errors) => {
      // 此处要注意，errors是一个对象数组，包含了当前所调接口里，所有验证失败的参数及错误信息。
      // 此处的处理是只返回第一个错误信息
      let msg = Object.values(errors[0].constraints)[0];
      return new BadRequestException({
         msg: msg,
         status: HttpStatus.BAD_REQUEST
      })
    }
  }));

  await app.listen(3000);
}
bootstrap();
