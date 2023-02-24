import { ApiProperty } from '@nestjs/swagger';
import { MaxMinFiltersResDTO } from '../../movies/dto/max-min-filters.response.dto';

import { GenreEntity } from '../../genres/entities/genre.entity';

export class GetAllFiltersRes extends MaxMinFiltersResDTO {
  @ApiProperty({ type: GenreEntity, isArray: true })
  genres: GenreEntity[];
}
