import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { TagsModule } from 'src/tags/tags.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog], 'db_read'),
    TypeOrmModule.forFeature([Blog], 'db_write'),
    CategoryModule,
    TagsModule,
    AuthorsModule
  ],
  controllers: [BlogsController],
  providers: [BlogsService,]
})
export class BlogsModule {}
