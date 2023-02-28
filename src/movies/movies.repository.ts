import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { Ordering, SortDirection } from '../../core/enums/main';

import { MaxMinFiltersResDTO } from './dto/max-min-filters.response.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { PaginationBodyDTO } from './dto/pagination-body.dto';
import { MovieEntity } from './entities/movie.entity';
import { IMoviesPagination } from './types/main';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private movieEntity: Repository<MovieEntity>,
  ) {}

  async findAllPaginate(
    paginateMoviesDto: PaginateMoviesDto,
    paginationBodyDTO: PaginationBodyDTO,
  ): Promise<IMoviesPagination> {
    const { pageSize, page, searchTerm } = paginateMoviesDto;
    const {
      orderBy,
      dir,
      includeAdult,
      searchInDescription,
      voteAvarageFrom,
      voteCountFrom,
      releaseDateFrom,
      releaseDateTo,
      genres_ids,
    } = paginationBodyDTO;
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const query = this.movieEntity.createQueryBuilder('movies');

    if (!includeAdult) {
      query.where('movies.adult = :adult', { adult: false });
    }

    if (orderBy === Ordering.Title) {
      query
        .andWhere('movies.title is not null')
        .orderBy('movies.title', dir === SortDirection.Ascend ? 'ASC' : 'DESC');
    } else {
      query.orderBy(
        `movies.${orderBy ? orderBy : Ordering.Popularity}`,
        dir === SortDirection.Ascend ? 'ASC' : 'DESC',
      );
    }

    query.take(pageSize).skip((page - 1) * pageSize);

    if (!query) throw new BadRequestException('No such page');

    if (releaseDateFrom || releaseDateTo) {
      query.andWhere(
        `movies.release_date BETWEEN '${
          releaseDateFrom && releaseDateFrom > 1990 ? releaseDateFrom : 1990
        }-01-01' AND '${
          releaseDateTo &&
          releaseDateFrom > 1990 &&
          releaseDateTo > releaseDateFrom
            ? releaseDateTo
            : currentYear
        }-12-31'`,
      );
    }

    if (genres_ids?.length) {
      query.andWhere('movies.genre_ids && :genres', { genres: genres_ids });
    }

    query.andWhere(
      'movies.vote_average >= :voteAvarage AND movies.vote_count >= :voteCount',
      {
        voteAvarage: voteAvarageFrom ? voteAvarageFrom : 1,
        voteCount: voteCountFrom ? voteCountFrom : 0,
      },
    );

    if (searchTerm) {
      const trimmedSearch = searchTerm.trim();
      query.andWhere(
        new Brackets((qb) => {
          qb.where('movies.title ILIKE :title', {
            title: `%${trimmedSearch}%`,
          }).orWhere('movies.original_title ILIKE :original_title', {
            original_title: `%${trimmedSearch}%`,
          });

          searchInDescription &&
            qb.orWhere('movies.overview ILIKE :overview', {
              overview: `%${trimmedSearch}%`,
            });
        }),
      );
    }

    const totalAmount = await query.getCount();
    const totalPages = Math.ceil(totalAmount / pageSize);

    const movies = await query.getMany();

    return {
      total_results: totalAmount,
      total_pages: totalPages,
      results: movies,
      page: page,
      page_size: pageSize,
    };
  }

  async findMovieById(movieId: number): Promise<MovieEntity> {
    const searchMovie = await this.movieEntity
      .createQueryBuilder('movies')
      .leftJoinAndSelect('movies.production_companies', 'production_companies')
      .where('movies.id = :id', { id: movieId })
      .getOne();

    if (!searchMovie) {
      throw new NotFoundException('Movie is not exist');
    }

    return searchMovie;
  }

  async findLastPopular(movieAmount: number): Promise<MovieEntity[]> {
    const serchMovies = await this.movieEntity
      .createQueryBuilder('movies')
      .orderBy('movies.popularity', 'DESC')
      .take(movieAmount)
      .getMany();

    if (!serchMovies?.length)
      throw new NotFoundException('Movies are not exist');

    return serchMovies;
  }

  async getMaxMinYearMaxVoteCount(): Promise<MaxMinFiltersResDTO> {
    const query = await this.movieEntity
      .createQueryBuilder('movies')
      .select('MAX(movies.release_date)', 'maxYear')
      .addSelect('MIN(movies.release_date)', 'minYear')
      .addSelect('MAX(movies.vote_count)', 'maxVoteCount')
      .getRawOne();

    if (!query) {
      throw new NotFoundException('Not found max and min filters');
    }

    return {
      max_year: query.maxYear.getFullYear(),
      min_year: query.minYear.getFullYear(),
      vote_count: query.maxVoteCount,
    };
  }

  async saveMovies(movies: MovieEntity[]): Promise<void> {
    const moviesEntities = this.movieEntity.create(movies);
    const saveMovie = await this.movieEntity.save(moviesEntities);

    if (!saveMovie) {
      throw new BadRequestException('Couldn`t save movies');
    }
  }

  async saveUpdateOneMovie(movie: MovieEntity): Promise<void> {
    const saveMovie = await this.movieEntity.save(movie);
    if (!saveMovie) {
      throw new BadRequestException('Couldn`t save movie');
    }
  }
}
