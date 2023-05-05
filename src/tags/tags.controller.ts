import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { getResponseFormat } from 'src/utils/misc';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return getResponseFormat(
      'Create Tag ',
      await this.tagService.create(createTagDto),
    );
  }

  @Get()
  async findAll() {
    return getResponseFormat(
      'Get Tags',
      await this.tagService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return getResponseFormat(
      'Get Tag Details',
      await this.tagService.findOne(id)
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return getResponseFormat(
      'Delete Tag',
      await this.tagService.remove(id)
    );
  }
}
