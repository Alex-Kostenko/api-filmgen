import { Repository } from 'typeorm';
import { IPositiveRequest } from '../../core/types/main';
import { GenreEntity } from './entities/genre.entity';
import { IData } from './types/genre.interface';
export declare class GenresRepository {
    private genreEntity;
    constructor(genreEntity: Repository<GenreEntity>);
    findAll(): Promise<GenreEntity[]>;
    findByIds(idsArray: number[]): Promise<GenreEntity[]>;
    saveGenres(data: IData): Promise<IPositiveRequest>;
}
