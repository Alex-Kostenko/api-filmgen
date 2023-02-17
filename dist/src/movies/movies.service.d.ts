import { HttpService } from '@nestjs/axios';
import { IPositiveRequest } from '../../core/types/main';
import { MaxMinYearResDTO } from './dto/max-min-year.response.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { PaginationBodyDTO } from './dto/pagination-body.dto';
import { PaginationResDTO } from './dto/pagination.result.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';
import { IFindMovieById } from './types/main';
export default class MoviesService {
    private moviesRepository;
    private httpService;
    constructor(moviesRepository: MoviesRepository, httpService: HttpService);
    findAllPaginate(paginateMoviesDto: PaginateMoviesDto, paginationBodyDTO: PaginationBodyDTO): Promise<PaginationResDTO>;
    findMovieById(movieId: number): Promise<IFindMovieById>;
    findMicrosoftUrl(title: string): Promise<string>;
    findRezkaUrl(title: string): Promise<string>;
    findLastPopular(getLastPopularDto: number): Promise<MovieEntity[]>;
    getMaxMinYear(): Promise<MaxMinYearResDTO>;
    fetchMovies(): Promise<IPositiveRequest>;
}
