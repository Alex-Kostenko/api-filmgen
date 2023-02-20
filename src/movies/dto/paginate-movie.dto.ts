import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginateDto } from '../../../core/dto/paginate.dto';

export class PaginateMoviesDto extends PaginateDto {
  @ApiPropertyOptional({ type: String, name: 'searchTerm' })
  @IsOptional()
  @IsString()
  @MaxLength(400)
  searchTerm?: string;
}
