import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GenreEntity } from './entities/genre.entity';
import { GenresService } from './genres.service';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @ApiOkResponse({ type: GenreEntity, isArray: true })
  @Get('all')
  findAllGenres(): Promise<GenreEntity[]> {
    return this.genresService.findAll();
  }
}
