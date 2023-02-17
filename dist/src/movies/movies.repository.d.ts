import { Repository, SelectQueryBuilder } from 'typeorm';
import { FilterMoviesDto } from './dto/filter-movie.dto';
import { MaxMinYearResDTO } from './dto/max-min-year.response.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { IMoviesPagination } from './types/main';
export declare class MoviesRepository {
    private movieEntity;
    constructor(movieEntity: Repository<MovieEntity>);
    findAllPaginate(paginateMoviesDto: PaginateMoviesDto, paginationBodyDTO: FilterMoviesDto[]): Promise<IMoviesPagination>;
    filterMovies(query: SelectQueryBuilder<MovieEntity>, filterMoviesDto: FilterMoviesDto, currentYear: number): Promise<void>;
    findMovieById(movieId: number): Promise<MovieEntity>;
    findLastPopular(movieAmount: number): Promise<MovieEntity[]>;
    getMaxMinYear(): Promise<MaxMinYearResDTO>;
    saveMovies(movies: MovieEntity[]): Promise<void>;
}
