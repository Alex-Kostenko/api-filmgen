import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class GetByIdsDto {
  @ApiProperty({ type: Number, isArray: true, default: [] })
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(100000000, { each: true })
  genres_ids: number[];
}
