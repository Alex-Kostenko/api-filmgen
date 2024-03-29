import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import FormData from 'form-data';

import { IPagination, IPositiveRequest } from '../../core/types/main';
import { findUrlUtil } from '../../core/utils/find-url.util';
import { parseUrlUtil } from '../../core/utils/parse-url.util';
import { ProductionCompanyRepository } from '../production_companies/production_companies.repository';

import { MaxMinFiltersResDTO } from './dto/max-min-filters.response.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { PaginationBodyDTO } from './dto/pagination-body.dto';
import { PaginationResDTO } from './dto/pagination.result.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';

import { IMoviesUrls, IMovieTrailer, IMovieTrailerResult } from './types/main';

@Injectable()
export default class MoviesService {
  constructor(
    private moviesRepository: MoviesRepository,
    private productionCompamiesRepository: ProductionCompanyRepository,
    private httpService: HttpService,
  ) {}

  async findAllPaginate(
    paginateMoviesDto: PaginateMoviesDto,
    paginationBodyDTO: PaginationBodyDTO,
  ): Promise<PaginationResDTO> {
    const result = await this.moviesRepository.findAllPaginate(
      paginateMoviesDto,
      paginationBodyDTO,
    );

    return {
      data: result,
      ...paginationBodyDTO,
    };
  }

  async findMovieById(movieId: number): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findMovieById(movieId);
    try {
      if (!movie.imdb_id) {
        const { data } = await this.httpService.axiosRef.get<MovieEntity>(
          process.env.MOVIE_API_URL_GET_DETAILS +
            movieId +
            `?api_key=${process.env.API_KEY}&language=ru`,
        );
        await this.productionCompamiesRepository.saveProductionCompanies(
          data.production_companies,
        );

        await this.moviesRepository.saveUpdateOneMovie(data);
        return new MovieEntity({ ...movie, ...data });
      }
    } catch {
      return movie;
    }

    return movie;
  }

  async findRezkaUrl(movieId: number): Promise<IMoviesUrls> {
    const movie = await this.moviesRepository.findMovieById(movieId);

    return {
      link: await this.findUrlWithFormData(
        'q',
        movie.title,
        process.env.REZKA_URL,
      ),
      site: 'rezka',
    };
  }

  async findMicrosoftUrl(movieId: number): Promise<IMoviesUrls> {
    const movie = await this.moviesRepository.findMovieById(movieId);
    try {
      const { data } = await this.httpService.axiosRef.get(
        process.env.MICROSOFT_URL + parseUrlUtil(movie.original_title),
      );

      const microsoftUrl = data?.ResultSets[0]?.Suggests?.find(
        ({ Source }) => Source === 'Movie',
      );

      return {
        link: microsoftUrl.Url.replace('//', ''),
        site: 'microsoft',
      };
    } catch {
      return {
        link: null,
        site: 'microsoft',
      };
    }
  }

  async findUrlWithFormData(
    query: string,
    title: string,
    serchUrl: string,
  ): Promise<string> {
    try {
      const bodyData = new FormData();
      bodyData.append(query, title);
      const { data } = await this.httpService.axiosRef.post(serchUrl, bodyData);

      const url = findUrlUtil(data);

      return url;
    } catch {
      return null;
    }
  }

  async findMoviesIds(): Promise<number[]> {
    return this.moviesRepository.findMoviesIds();
  }

  async findLastPopular(getLastPopularDto: number): Promise<MovieEntity[]> {
    return this.moviesRepository.findLastPopular(getLastPopularDto);
  }

  async findTrailer(movieId: number): Promise<IMovieTrailer> {
    const { data } = await this.httpService.axiosRef.get<IMovieTrailerResult>(
      process.env.MOVIE_API_URL_GET_DETAILS +
        movieId +
        `/videos?&api_key=${process.env.API_KEY}&language=ru`,
    );

    if (!data) {
      throw new BadRequestException('Data is not exist');
    }

    const firstResult = data.results.at(0) ? data.results.at(0) : {};

    return firstResult;
  }

  async getMaxMinYearMaxVoteCount(): Promise<MaxMinFiltersResDTO> {
    return this.moviesRepository.getMaxMinYearMaxVoteCount();
  }

  async fetchMovies(): Promise<IPositiveRequest> {
    let page = 1;

    const sort_by = 'primary_release_date.asc';
    const primary_release_date = new Date().toJSON().slice(0, 10);

    setInterval(async () => {
      const { data } = await this.httpService.axiosRef.get<IPagination>(
        process.env.MOVIE_API_URL +
          `&api_key=${process.env.API_KEY}&sort_by=${sort_by}&page=${page}&primary_release_date.gte=${primary_release_date}`,
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
