import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
		@InjectRepository(Category, 'db_read')
		private readonly readRepository: Repository<Category>,
		@InjectRepository(Category, 'db_write')
    private readonly writeRepository: Repository<Category>,
    
  ) { }

  async create(payload: CreateCategoryDto) {
    const existed = await this.readRepository.findOneBy({ name: payload.name });
    if (existed) {
      throw new BadRequestException("Category name already exists");
    }
    try {
      const id: string = uuid.v4();
      const category = new Category();
      category.id = id;
      category.name = payload.name;
      return await this.writeRepository.save(category);
    }catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll(): Promise<Category[]> {
    return this.readRepository.find();
  }

  async getMultiTags(ids: string[]) {
    try {
			return this.readRepository.findByIds(ids);
		} catch (error) {
			throw new BadRequestException(error);
		}
  }

  async findOne(id: string): Promise<Category> {
    return await this.readRepository.findOneBy({ id });
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.writeRepository.findOneBy({id});
		if (!category) {
			throw new BadRequestException('No category Found!');
		}

		try {
			category.name = payload.name;
			category.updatedAt = new Date();
			return this.writeRepository.save(category);
		} catch (error) {
			throw new BadRequestException(error);
		}
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return this.writeRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
