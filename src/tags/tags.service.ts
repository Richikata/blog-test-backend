import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
		@InjectRepository(Tag, 'db_read')
		private readonly readRepository: Repository<Tag>,
		@InjectRepository(Tag, 'db_write')
    private readonly writeRepository: Repository<Tag>,
    
  ) { }

  async create(payload: CreateTagDto) {
    const existed = await this.readRepository.findOneBy({ name: payload.name });
    if (existed) {
      throw new BadRequestException("Tag name already exists");
    }
    try {
      const id: string = uuid.v4();
      const tag = new Tag();
      tag.id = id;
      tag.name = payload.name;
      return await this.writeRepository.save(tag);
    }catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getMultiTags(ids: string[]) {
    try {
			return this.readRepository.findByIds(ids);
		} catch (error) {
			throw new BadRequestException(error);
		}
  }

  findAll(): Promise<Tag[]> {
    return this.readRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    return await this.readRepository.findOneBy({id});
  }

  async update(id: string, payload: UpdateTagDto) {
    const tag = await this.writeRepository.findOneBy({id});
		if (!tag) {
			throw new BadRequestException('No tag Found!');
		}

		try {
			tag.name = payload.name;
			tag.updatedAt = new Date();
			return this.writeRepository.save(tag);
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
