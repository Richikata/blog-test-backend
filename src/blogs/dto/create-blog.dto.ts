import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	content: string;

	@IsNotEmpty()
	@IsString()
	imageUrl: string;

	@IsNotEmpty()
	@IsString()
	authorId: string;
	
	@ApiProperty({
		required: true,
		type: [String],
	})
  @IsNotEmpty()
	@IsString({ each: true })
	readonly tags: string[];

	@ApiProperty({
		required: true,
		type: [String],
	})
  @IsNotEmpty()
	@IsString({ each: true })
	readonly categories: string[];

}