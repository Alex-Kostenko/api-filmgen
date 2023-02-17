import { GetByIdsDto } from './dto/get-by-ids.dto';
import { GenreEntity } from './entities/genre.entity';
import { GenresRepository } from './genres.repository';
export declare class GenresService {
    private readonly genresRepository;
    constructor(genresRepository: GenresRepository);
    findAll(): Promise<GenreEntity[]>;
    findByIds(idsArray: GetByIdsDto): Promise<GenreEntity[]>;
}
