import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
  name: string;
}
