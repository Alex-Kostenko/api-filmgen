import { MovieEntity } from '../entities/movie.entity';
export declare class FilterResDTO {
    page_size: number;
    page: number;
    results: MovieEntity[];
    total_pages: number;
    total_results: number;
}
