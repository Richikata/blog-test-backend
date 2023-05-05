import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { getResponseFormat } from 'src/utils/misc';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { GetBlogQueryDto } from './dto/get-blog-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Post()
  async create(@Body() {tags, categories, ...payload}: CreateBlogDto) {
    return getResponseFormat(
      'Create Blog ',
      await this.blogService.create(payload, tags, categories),
    );
  }

  @Get()
  async findAll(@Query() payload: GetBlogQueryDto) {
    return getResponseFormat(
      'Get Blogs',
      await this.blogService.getBlogList(payload)
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return getResponseFormat(
      'Get Blog Details',
      await this.blogService.findOne(id)
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() {tags, categories, ...payload}: UpdateBlogDto) {
    return this.blogService.update(id, payload, tags, categories);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return getResponseFormat(
      'Delete Blog',
      await this.blogService.remove(id)
    );
  }
}
