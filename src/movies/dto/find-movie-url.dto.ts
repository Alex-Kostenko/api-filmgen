import { ApiProperty } from '@nestjs/swagger';

export class FindMovieUrlDto {
  @ApiProperty({
    type: String,
  })
  link: string;

  @ApiProperty({ type: String })
  site: string;
}
