import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CategoryService } from 'src/category/category.service';
import { TagsService } from 'src/tags/tags.service';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Tag } from 'src/tags/entities/tag.entity';
import { AuthorsService } from 'src/authors/authors.service';
import { GetBlogQueryDto } from './dto/get-blog-query.dto';

@Injectable()
export class BlogsService {
  constructor(
		@InjectRepository(Blog, 'db_read')
		private readonly readRepository: Repository<Blog>,
		@InjectRepository(Blog, 'db_write')
    private readonly writeRepository: Repository<Blog>,
    
    private readonly categoryService: CategoryService,
    private readonly tagsService: TagsService,
    private readonly authorService: AuthorsService,
  ) { }

  async create(payload, tags, categories) {
    try {
      
      const tagList = await this.tagsService.getMultiTags(JSON.parse(tags));
      const categoryList = await this.categoryService.getMultiTags(JSON.parse(categories));

      const author = await this.authorService.findOne(payload.authorId);
      
      const id: string = uuid.v4();
      const blog = new Blog();
      blog.id = id;
      blog.name = payload.name;
      blog.content = payload.content;
      blog.imageUrl = payload.imageUrl;
      blog.author = author;
      blog.tags = tagList;
      blog.category = categoryList;
      return await this.writeRepository.save(blog);
    }catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getBlogList({
		page = 1,
		limit = 10,
		...payload
	}: GetBlogQueryDto) {
		return this.getAll(
			{ page, limit },
			payload.search,
			payload.orderBy,
			payload.order === 'asc' ? 'ASC' : 'DESC',
		);
	}

  async getAll(
		options: IPaginationOptions,
		search?: string,
		orderBy = 'createdAt',
		order: 'DESC' | 'ASC' = 'DESC',
	): Promise<Pagination<Blog>> {
    try {
      const builder = this.readRepository.createQueryBuilder('b');
			if (search) {
				builder.andWhere(
					new Brackets(qb => {
						qb.where('b.code LIKE :code', {
							name: `%${search}%`,
						})
					}),
				);
			}
      builder.orderBy('b.' + orderBy, order);
      builder.innerJoinAndSelect('b.author', 'author');
      builder.innerJoinAndSelect('b.tags', 'tags');
      builder.innerJoinAndSelect('b.category', 'category');
			return paginate<Blog>(builder, options);
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

  findAll(): Promise<Blog[]> {
    return this.readRepository.find();
  }

  async findOne(id: string): Promise<Blog> {
    return await this.readRepository.findOneBy({ id });
  }

  async update(id: string, payload, tags, categories) {
    const tagList = await this.tagsService.getMultiTags(JSON.parse(tags));
    const categoryList = await this.categoryService.getMultiTags(JSON.parse(categories));
    const blog = await this.writeRepository.findOneBy({id});
		if (!blog) {
			throw new BadRequestException('No blog Found!');
		}

		try {
      blog.name = payload.name;
      blog.tags = tagList;
      blog.category = categoryList;
			blog.updatedAt = new Date();
			return this.writeRepository.save(blog);
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
