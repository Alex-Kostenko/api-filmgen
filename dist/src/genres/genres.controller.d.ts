import { GetByIdsDto } from './dto/get-by-ids.dto';
import { GenreEntity } from './entities/genre.entity';
import { GenresService } from './genres.service';
export declare class GenresController {
    private genresService;
    constructor(genresService: GenresService);
    findAllGenres(): Promise<GenreEntity[]>;
    findByIds(idsArray: GetByIdsDto): Promise<GenreEntity[]>;
}
