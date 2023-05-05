import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
  name: string;
}