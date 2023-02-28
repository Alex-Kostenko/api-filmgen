import { Injectable } from '@nestjs/common';

import { GenreEntity } from './entities/genre.entity';
import { GenresRepository } from './genres.repository';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async findAll(): Promise<GenreEntity[]> {
    return this.genresRepository.findAll();
  }
}
