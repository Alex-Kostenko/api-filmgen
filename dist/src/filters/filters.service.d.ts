import { GenresRepository } from '../genres/genres.repository';
import { MoviesRepository } from '../movies/movies.repository';
import { GetAllFiltersRes } from './dto/get-all-filters.response.dto';
export declare class FiltersService {
    private genresRepository;
    private moviesRepository;
    constructor(genresRepository: GenresRepository, moviesRepository: MoviesRepository);
    findAll(): Promise<GetAllFiltersRes>;
}
