import { IPositiveRequest } from '../../core/types/main';
import { GetLastPopularDto } from './dto/get-last-popular.dto';
import { GetMovieByIdDto } from './dto/get-movie-by-id.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { PaginationBodyDTO } from './dto/pagination-body.dto';
import { PaginationResDTO } from './dto/pagination.result.dto';
import { MovieEntity } from './entities/movie.entity';
import MoviesService from './movies.service';
import { IFindMovieById } from './types/main';
export declare class MoviesController {
    private moviesService;
    constructor(moviesService: MoviesService);
    findLastPopular(getLastPopularDto: GetLastPopularDto): Promise<MovieEntity[]>;
    findAllPaginate(paginateMoviesDto: PaginateMoviesDto, paginationBodyDTO: PaginationBodyDTO): Promise<PaginationResDTO>;
    findMovieById(getMovieByIdDto: GetMovieByIdDto): Promise<IFindMovieById>;
    fetch(): Promise<IPositiveRequest>;
}
