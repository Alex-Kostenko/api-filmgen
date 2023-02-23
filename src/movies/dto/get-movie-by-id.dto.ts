import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class GetMovieByIdDto {
  @ApiProperty({ type: Number, default: 10, required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(1000000000)
  movieId: number;
}
