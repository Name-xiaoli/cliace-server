import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IsPublicBlogDto } from './dto/isPublic-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';

//关联数据库
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { User } from '../users/entities/user.entity'

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog) private blog: Repository<Blog>,
    @InjectRepository(User) private user: Repository<User>) { }


  //发布博客
  async add(createBlogDto: CreateBlogDto): Promise<Object> {
    try {
      const blog = new Blog()
      const userInfo = await this.user.findOne({
        where: {
          id: createBlogDto.userId
        }
      })
      blog.title = createBlogDto.title
      blog.text = createBlogDto.text
      blog.user=userInfo
      await this.blog.save(blog)
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

  //查找所有博客
  async findAll(): Promise<Object | Blog> {
    try {
      return await this.blog.find({
        relations: ["user"],
        where:{
          isPublic:true
        }
      })
    } catch (error) {
      return {
        err: error,
        message: "博客查找失败"
      }
    }
  }

  //查找自己的博客
  async findMyBlog(userId: number): Promise<Object | User> {
    try {
      return await this.user.find({
        relations: ["blogs"],
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

  //修改博客内容
  async changeBlog(blogId: number, updateBlogDto: UpdateBlogDto): Promise<Object> {
    try {
      const blogInfo = await this.blog.findOne({
        where: {
          id: blogId
        }
      })
      if (!blogInfo) {
        return {
          message: "没有找到这条博客信息"
        }
      }
      console.log(blogInfo);
      blogInfo.title = updateBlogDto.title
      blogInfo.text = updateBlogDto.text
      await this.blog.save(blogInfo)
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

  //是否公开博客
  async isPublic(isPublicBlogDto: IsPublicBlogDto) : Promise<Object>{
    try {
      const blogInfo = await this.blog.findOne({
        where: {
          id: isPublicBlogDto.id
        }
      })
      if (!blogInfo) {
        return {
          message: "没有找到这条博客信息"
        }
      }
      console.log(blogInfo);
      blogInfo.isPublic = !isPublicBlogDto.isPublic
      await this.blog.save(blogInfo)
      return {
        message: blogInfo.isPublic ? "博客已公开" : "博客已私密"
      }
    } catch (error) {
      return {
        err: error,
        message: "修改博客状态失败"
      }
    }
  }

  //删除博客
  async DeleteBlogDto(deleteBlogDto: DeleteBlogDto): Promise<Object> {
    try {
      const res = await this.user.findOne({
        relations: ["blogs"],
        where: {
          id: deleteBlogDto.userId
        }
      })
      const id = []
      res.blogs.forEach((item) => {
        id.push(item.id)
      })
      if (id.includes(deleteBlogDto.blogId)) {
        await this.blog.delete(deleteBlogDto.blogId)
        return {
          message:"成功删除此博客"
        }
      }else{
        return {
          message:"该用户没有此博客"
        }
      }
    } catch (error) {
      return {
        err: error,
        message: "删除博客失败"
      }
    }
  }



  // create(createBlogDto: CreateBlogDto) {
  //   return 'This action adds a new blog';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} blog`;
  // }

  // update(id: number, updateBlogDto: UpdateBlogDto) {
  //   return `This action updates a #${id} blog`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} blog`;
  // }
}
