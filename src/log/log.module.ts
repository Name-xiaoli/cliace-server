import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';

//数据库
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Log } from './entities/log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Log])],
  controllers: [LogController],
  providers: [LogService]
})
export class LogModule {}
