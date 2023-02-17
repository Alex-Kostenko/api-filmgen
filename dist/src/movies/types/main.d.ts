import { IPagination } from '../../../core/types/main';
import { MovieEntity } from '../../movies/entities/movie.entity';
export interface IMovie {
    id: number;
    name: string;
}
export interface IMoviesPagination extends IPagination {
    page_size: number;
}
export interface IFindMovieById extends MovieEntity {
    urls: {
        link: string | null;
        site: string;
    }[];
}
