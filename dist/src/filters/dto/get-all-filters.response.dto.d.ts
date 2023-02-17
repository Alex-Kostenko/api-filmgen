import { GenreEntity } from '../../genres/entities/genre.entity';
import { MaxMinYearResDTO } from '../../movies/dto/max-min-year.response.dto';
export declare class GetAllFiltersRes extends MaxMinYearResDTO {
    genres: GenreEntity[];
}
