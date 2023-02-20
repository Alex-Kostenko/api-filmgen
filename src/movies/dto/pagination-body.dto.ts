import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Ordering, SortDirection } from '../../../core/enums/main';

import { FilterMoviesDto } from './filter-movie.dto';

export class PaginationBodyDTO {
  @ApiProperty({ type: [FilterMoviesDto] })
  @ValidateNested({ each: true })
  @Type(() => FilterMoviesDto)
  @IsNotEmpty()
  filters: FilterMoviesDto[];

  @ApiPropertyOptional({
    enum: SortDirection,
    name: 'dir',
    default: SortDirection.Descend,
  })
  @IsOptional()
  @IsEnum(SortDirection)
  dir?: SortDirection;

  @ApiPropertyOptional({
    enum: Ordering,
    name: 'orderBy',
    default: Ordering.Popularity,
  })
  @IsOptional()
  @IsEnum(Ordering)
  orderBy?: Ordering;

  @ApiPropertyOptional({ type: Boolean, name: 'includeAdult', default: false })
  @IsOptional()
  @IsBoolean()
  includeAdult?: boolean;

  @ApiPropertyOptional({ type: Boolean, name: 'searchInDescription' })
  @IsOptional()
  @IsBoolean()
  searchInDescription?: boolean;
}
