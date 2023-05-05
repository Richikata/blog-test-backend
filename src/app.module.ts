import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { AuthorsModule } from './authors/authors.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { CategoryModule } from './category/category.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
    BlogsModule,
    AuthorsModule,
    DatabaseModule,
    AuthModule,
    TagsModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
