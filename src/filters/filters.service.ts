import { Injectable } from '@nestjs/common';

import { GenresRepository } from '../genres/genres.repository';
import { MoviesRepository } from '../movies/movies.repository';

import { GetAllFiltersRes } from './dto/get-all-filters.response.dto';

@Injectable()
export class FiltersService {
  constructor(
    private genresRepository: GenresRepository,
    private moviesRepository: MoviesRepository,
  ) {}

  async findAll(): Promise<GetAllFiltersRes> {
    const genres = await this.genresRepository.findAll();
    const maxMinFilters =
      await this.moviesRepository.getMaxMinYearMaxVoteCount();

    return { genres: genres, ...maxMinFilters };
  }
}
