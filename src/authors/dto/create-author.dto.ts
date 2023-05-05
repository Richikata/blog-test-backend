import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
  name: string;
  
  @ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	email: string;
	
	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
  imageUrl: string;
  
  @ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
