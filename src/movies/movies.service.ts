import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import FormData from 'form-data';

import { IPagination, IPositiveRequest } from '../../core/types/main';
import { findUrlUtil } from '../../core/utils/find-url.util';
import { parseUrlUtil } from '../../core/utils/parse-url.util';

import { MaxMinYearResDTO } from './dto/max-min-year.response.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { PaginationBodyDTO } from './dto/pagination-body.dto';
import { PaginationResDTO } from './dto/pagination.result.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';
import { IFindMovieById } from './types/main';

@Injectable()
export default class MoviesService {
  constructor(
    private moviesRepository: MoviesRepository,
    private httpService: HttpService,
  ) {}

  async findAllPaginate(
    paginateMoviesDto: PaginateMoviesDto,
    paginationBodyDTO: PaginationBodyDTO,
  ): Promise<PaginationResDTO> {
    const result = await this.moviesRepository.findAllPaginate(
      paginateMoviesDto,
      paginationBodyDTO.filters,
    );

    return {
      data: result,
      ...paginationBodyDTO,
    };
  }

  async findMovieById(movieId: number): Promise<IFindMovieById> {
    const movie = await this.moviesRepository.findMovieById(movieId);
    const { original_title, title } = movie;

    return {
      ...movie,
      urls: [
        { link: await this.findRezkaUrl(title), site: 'rezka' },
        {
          link: original_title && (await this.findMicrosoftUrl(original_title)),
          site: 'microsoft',
        },
      ],
    };
  }

  async findMicrosoftUrl(title: string): Promise<string> {
    try {
      const microsoftData = await this.httpService.axiosRef.get(
        `https://www.microsoft.com/msstoreapiprod/api/autosuggest?market=en-us&sources=Iris-Products%2CDCatAll-Products%2CMicrosoft-Terms&query=${parseUrlUtil(
          title,
        )}`,
      );

      const microsoftUrl = microsoftData?.data?.ResultSets[0]?.Suggests?.find(
        ({ Source }) => Source === 'Movie',
      );
      return microsoftUrl.Url.replace('//', '');
    } catch {
      return null;
    }
  }

  async findRezkaUrl(title: string): Promise<string> {
    try {
      const bodyData = new FormData();
      bodyData.append('q', title);
      const rezkaData = await this.httpService.axiosRef.post(
        process.env.REZKA_URL,
        bodyData,
      );

      const rezkaUrl = findUrlUtil(rezkaData.data);

      return rezkaUrl;
    } catch {
      return null;
    }
  }

  async findLastPopular(getLastPopularDto: number): Promise<MovieEntity[]> {
    return this.moviesRepository.findLastPopular(getLastPopularDto);
  }

  async getMaxMinYear(): Promise<MaxMinYearResDTO> {
    return this.moviesRepository.getMaxMinYear();
  }

  async fetchMovies(): Promise<IPositiveRequest> {
    let page = 1;

    const sort_by = 'primary_release_date.asc';
    const primary_release_date = new Date().toJSON().slice(0, 10);

    setInterval(async () => {
      const { data } = await this.httpService.axiosRef.get<IPagination>(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=${sort_by}&include_adult=true&page=${page}&language=ru&primary_release_date.gte=${primary_release_date}`,
      );
      if (data) {
        throw new BadRequestException('Not found');
      }

      this.moviesRepository.saveMovies(data.results);

      page++;
    }, 3000);

    return { success: true };
  }
}
