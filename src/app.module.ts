import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//数据库
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';
import { LogModule } from './log/log.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "cliace",
      // entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    BlogModule,
    LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
