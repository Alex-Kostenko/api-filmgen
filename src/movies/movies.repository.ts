import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  LessThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { Filters, Ordering, SortDirection } from '../../core/enums/main';
import { IPositiveRequest } from '../../core/types/main';

import { FilterMoviesDto } from './dto/filter-movie.dto';
import { MaxMinYearResDTO } from './dto/max-min-year.response.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
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
    paginationBodyDTO: FilterMoviesDto[],
  ): Promise<IMoviesPagination> {
    const { pageSize, page, searchTerm, orderBy, dir } = paginateMoviesDto;
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const query = this.movieEntity.createQueryBuilder('movies');

    query.orderBy(
      `movies.${orderBy ? orderBy : Ordering.Popularity}`,
      dir === SortDirection.Descend ? 'DESC' : 'ASC',
    );

    query.take(pageSize).skip((page - 1) * pageSize);

    if (!query) throw new BadRequestException('No such page');

    if (paginationBodyDTO.length) {
      for await (const filter of paginationBodyDTO) {
        this.filterMovies(query, filter, currentYear);
      }
    }

    if (searchTerm) {
      query.where('movies.title ILIKE :title', {
        title: `%${searchTerm.trim()}%`,
      });
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

  async filterMovies(
    query: SelectQueryBuilder<MovieEntity>,
    filterMoviesDto: FilterMoviesDto,
    currentYear: number,
  ) {
    const { from, to, field, genres_ids } = filterMoviesDto;

    switch (field) {
      case Filters.Genres:
        query.where('movies.genre_ids && :genres', { genres: genres_ids });
        break;

      case Filters.ReleaseDate:
        query.andWhere(
          new Brackets((qb) => {
            qb.where('movies.release_date >= :from', {
              from: `${from ? from : 1990}-01-01`,
            }).andWhere('movies.release_date <= :to', {
              to: `${to ? to : currentYear}-12-31`,
            });
          }),
        );
        break;

      case Filters.VoteAverage:
        query.andWhere(
          new Brackets((qb) => {
            qb.where('movies.vote_average >= :from', {
              from: from,
            }).andWhere('movies.vote_average <= :to', {
              to: to,
            });
          }),
        );
        break;

      case Filters.VoteCount:
        query.andWhere(
          new Brackets((qb) => {
            qb.where('movies.vote_count >= :from', {
              from: from,
            }).andWhere('movies.vote_count <= :to', {
              to: to,
            });
          }),
        );
        break;

      default:
        break;
    }
  }

  async findMovieById(movieId: number): Promise<MovieEntity> {
    const searchMovie = await this.movieEntity
      .createQueryBuilder('movies')
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

    if (!serchMovies.length)
      throw new NotFoundException('Movies are not exist');

    return serchMovies;
  }

  async getMaxMinYear(): Promise<MaxMinYearResDTO> {
    const query = await this.movieEntity
      .createQueryBuilder('movies')
      .select('MAX(movies.release_date)', 'maxYear')
      .addSelect('MIN(movies.release_date)', 'minYear')
      .getRawOne();

    return {
      max_year: query.maxYear.getFullYear(),
      min_year: query.minYear.getFullYear(),
    };
  }

  async remove(year: number): Promise<IPositiveRequest> {
    const deletedMovies = await this.movieEntity
      .createQueryBuilder('movies')
      .delete()
      .from('movies')
      .where({ release_date: LessThanOrEqual('2021-10-08') })
      .execute();

    if (deletedMovies.affected === 0) {
      throw new HttpException('Movies is not exist', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
    };
  }

  async saveMovies(movies: MovieEntity[]): Promise<void> {
    try {
      const moviesEntities = this.movieEntity.create(movies);
      await this.movieEntity.save(moviesEntities);
    } catch {
      throw new BadRequestException('Bad request');
    }
  }
}
