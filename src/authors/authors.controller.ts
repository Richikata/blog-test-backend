import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { getResponseFormat } from 'src/utils/misc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return getResponseFormat(
      'Create Author ',
      await this.authorsService.create(createAuthorDto),
    );
  }

  @Get()
  async findAll() {
    return getResponseFormat(
      'Get Authors',
      await this.authorsService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return getResponseFormat(
      'Get Author Details',
      await this.authorsService.findOne(id)
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return getResponseFormat(
      'Delete Author',
      await this.authorsService.remove(id)
    );
  }
}
