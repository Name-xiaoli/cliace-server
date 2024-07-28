import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

//数据库
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import {Blog} from './entities/blog.entity'

@Module({
  imports:[TypeOrmModule.forFeature([User,Blog])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
