import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from 'src/utils/pagination.dto';

export class GetBlogQueryDto extends PaginationDto{
    @ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly search?: string;

	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly orderBy?: string;


	@ApiProperty({
		required: false,
	})
	@IsOptional()
	@IsString()
    readonly order?: string;
}