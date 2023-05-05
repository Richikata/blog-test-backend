import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { getResponseFormat } from 'src/utils/misc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryto: CreateCategoryDto) {
    return getResponseFormat(
      'Create Category',
      await this.categoryService.create(createCategoryto),
    );
  }

  @Get()
  async findAll() {
    return getResponseFormat(
      'Get Category',
      await this.categoryService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return getResponseFormat(
      'Get CategoryDetails',
      await this.categoryService.findOne(id)
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return getResponseFormat(
      'Delete Category',
      await this.categoryService.remove(id)
    );
  }
}
