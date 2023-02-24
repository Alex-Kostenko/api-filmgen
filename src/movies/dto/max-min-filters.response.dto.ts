import { ApiProperty } from '@nestjs/swagger';

export class MaxMinFiltersResDTO {
  @ApiProperty({ type: Number, example: 2023 })
  max_year: number;

  @ApiProperty({ type: Number, example: 2021 })
  min_year: number;

  @ApiProperty({ type: Number, example: 560 })
  vote_count: number;
}
