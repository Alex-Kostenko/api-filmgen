import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPositiveRequest } from '../../core/types/main';

import { GenreEntity } from './entities/genre.entity';
import { IData } from './types/genre.interface';

@Injectable()
export class GenresRepository {
  constructor(
    @InjectRepository(GenreEntity)
    private genreEntity: Repository<GenreEntity>,
  ) {}

  async findAll(): Promise<GenreEntity[]> {
    return this.genreEntity
      .createQueryBuilder('genres')
      .orderBy('genres.name', 'ASC')
      .getMany();
  }

  async saveGenres(data: IData): Promise<IPositiveRequest> {
    try {
      const genresEntities = this.genreEntity.create(data.genres);
      await this.genreEntity.save(genresEntities);
      return { success: true };
    } catch (error) {
      throw new BadRequestException('Failed to save genres');
    }
  }
}
