import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { IsPublicLogDto } from './dto/isPublic-log.dto';
import { DeleteLogDto } from './dto/delete-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  //发布日记
  @Post('add')
  async addBlog(@Body() createLogDto:CreateLogDto) {
    return this.logService.add(createLogDto)
  }

  //查找所有日记
  @Get('all')
  async findAll() {
    return this.logService.findAll()
  }

  //查找自己的日记
  @Get('my')
  async findMyBlog(@Query('userId') userId:number) {
    return this.logService.my(userId)
  }

  //修改日记内容
  @Patch()
  async changeBlog(@Body() updateLogDto:UpdateLogDto){
    return this.logService.change(updateLogDto)
  }

  //是否公开日记
  @Patch('isPublic')
  async isPublic(@Body() isPublicLogDto:IsPublicLogDto){
    return this.logService.isPublic(isPublicLogDto)
  }

  //删除日记
  @Delete()
  DeleteBlogDto(@Body() deleteLogDto:DeleteLogDto){
    return this.logService.delete(deleteLogDto)
  }
}
