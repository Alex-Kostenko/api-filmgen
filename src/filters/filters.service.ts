import { Injectable } from '@nestjs/common';

import { MoviesRepository } from '../movies/movies.repository';

import { GetAllFiltersRes } from './dto/get-all-filters.response.dto';

@Injectable()
export class FiltersService {
  constructor(private moviesRepository: MoviesRepository) {}

  async findAll(): Promise<GetAllFiltersRes> {
    const maxMinFilters =
      await this.moviesRepository.getMaxMinYearMaxVoteCount();

    return maxMinFilters;
  }
}
