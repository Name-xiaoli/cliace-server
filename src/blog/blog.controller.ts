import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IsPublicBlogDto } from './dto/isPublic-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';


@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  //发布博客
  @Post('add')
  async addBlog(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.add(createBlogDto);
  }

  //查找所有博客
  @Get('all')
  async findAll() {
    return await this.blogService.findAll();
  }

  //查找自己的博客
  @Get('my')
  async findMyBlog(@Query('userId') userId:number) {
    return await this.blogService.findMyBlog(userId);
  }

  //修改博客内容
  @Patch()
  async changeBlog(@Query('blogId') blogId :number ,@Body() updateBlogDto:UpdateBlogDto){
    return await this.blogService.changeBlog(blogId,updateBlogDto)
  }

  //是否公开博客
  @Patch('isPublic')
  async isPublic(@Body() iusPublicBlogDto:IsPublicBlogDto){
    return await this.blogService.isPublic(iusPublicBlogDto)
  }

  //删除博客
  @Delete()
  DeleteBlogDto(@Body() deleteBlogDto:DeleteBlogDto){
    return this.blogService.DeleteBlogDto(deleteBlogDto)
  }
}
