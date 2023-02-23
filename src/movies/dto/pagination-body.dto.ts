import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { GetByIdsDto } from 'genres/dto/get-by-ids.dto';
import { Ordering, SortDirection } from '../../../core/enums/main';

export class PaginationBodyDTO extends GetByIdsDto {
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

  @ApiPropertyOptional({ type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  includeAdult?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  searchInDescription?: boolean;

  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  voteAvarageFrom?: number;

  @ApiPropertyOptional({ type: Number, default: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  voteCountFrom?: number;

  @ApiPropertyOptional({ type: Number, default: 1990 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  releaseDateFrom?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  releaseDateTo?: number;
}
