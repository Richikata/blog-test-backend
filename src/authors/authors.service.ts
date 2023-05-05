import { BadRequestException, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
		@InjectRepository(Author, 'db_read')
		private readonly readRepository: Repository<Author>,
		@InjectRepository(Author, 'db_write')
    private readonly writeRepository: Repository<Author>,
    
  ) { }

  async create(payload: CreateAuthorDto) {
    try {
      const id: string = uuid.v4();
      const salt = genSaltSync(10);
      const author = new Author();
      author.id = id;
      author.name = payload.name;
      author.email = payload.email;
			author.password = hashSync(payload.password, salt);
      return await this.writeRepository.save(author);
    }catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll(): Promise<Author[]> {
    return this.readRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    return await this.readRepository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<Author> {
    try {
      return await this.readRepository.findOneBy({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(email: string, password: string): Promise<Author> {
    try {
      const author =  await this.readRepository
			.createQueryBuilder('authors')
			.addSelect('authors.password')
			.where('authors.email = :email', {
				email,
			})
      .getOne();
      
      const isEqual = await compare(password, author.password);
      if (!isEqual) {
        return null;
      } else return author;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, payload: UpdateAuthorDto) {
    const author = await this.writeRepository.findOneBy({id});
		if (!author) {
			throw new BadRequestException('No author Found!');
		}

		try {
			author.name = payload.name;
			author.imageUrl = payload.imageUrl;
			author.updatedAt = new Date();
			return this.writeRepository.save(author);
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
