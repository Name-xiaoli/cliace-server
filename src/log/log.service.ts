import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

//关联数据库
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Log } from './entities/log.entity';
import { IsPublicLogDto } from './dto/isPublic-log.dto';
import { DeleteLogDto } from './dto/delete-log.dto';

@Injectable()
export class LogService {

  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Log) private log: Repository<Log>
  ) { }

  //发布日记
  async add(createLogDto: CreateLogDto): Promise<Object> {
    try {
      const log = new Log()
      const userInfo = await this.user.findOne({
        where: {
          id: createLogDto.userId
        }
      })
      log.text = createLogDto.text
      log.user = userInfo
      await this.log.save(log)
      return {
        message: "博客发布成功"
      }
    } catch (error) {
      return {
        err: error,
        message: "博客发布失败"
      }
    }
  }

  //查找所有日记
  async findAll(): Promise<Object | Log> {
    try {
      return await this.log.find({
        relations: ["user"],
        where: {
          isPublic: true
        }
      })
    } catch (error) {
      return {
        err: error,
        message: "博客查找失败"
      }
    }
  }

  //查找自己的日记
  async my(userId: number): Promise<Object | Log> {
    try {
      return await this.user.find({
        relations: ["logs"],
        where: {
          id: userId
        }
      })
    } catch (error) {
      return {
        err: error,
        message: "博客查找失败"
      }
    }
  }

  //修改日记内容
  async change(updateLogDto: UpdateLogDto): Promise<Object> {
    try {
      const logInfo = await this.log.findOne({
        where: {
          id: updateLogDto.logId
        }
      })
      if (!logInfo) {
        return {
          message: "没有找到这条博客信息"
        }
      }
      console.log(logInfo);
      logInfo.text = updateLogDto.text
      await this.log.save(logInfo)
      return {
        message: "成功修改博客内容"
      }
    } catch (error) {
      return {
        err: error,
        message: "修改博客内容失败"
      }
    }
  }

  //是否公开日记
  async isPublic(isPublicLogDto: IsPublicLogDto): Promise<Object> {
    try {
      const logInfo = await this.log.findOne({
        where: {
          id: isPublicLogDto.id
        }
      })
      if (!logInfo) {
        return {
          message: "没有找到这条博客信息"
        }
      }
      console.log(logInfo);
      logInfo.isPublic = !isPublicLogDto.isPublic
      await this.log.save(logInfo)
      return {
        message: logInfo.isPublic ? "博客已公开" : "博客已私密"
      }
    } catch (error) {
      return {
        err: error,
        message: "修改博客状态失败"
      }
    }
  }

  //删除日记
  async delete(deleteLogDto: DeleteLogDto): Promise<Object> {
    try {
      const res = await this.user.findOne({
        relations: ["logs"],
        where: {
          id: deleteLogDto.userId
        }
      })
      const id = []
      res.logs.forEach((item) => {
        id.push(item.id)
      })
      if (id.includes(deleteLogDto.logId)) {
        await this.log.delete(deleteLogDto.logId)
        return {
          message: "成功删除此博客"
        }
      } else {
        return {
          message: "该用户没有此博客"
        }
      }
    } catch (error) {
      return {
        err: error,
        message: "删除博客失败"
      }
    }
  }
}
