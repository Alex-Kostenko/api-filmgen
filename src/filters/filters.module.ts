import { Module } from '@nestjs/common';

import { GenresModule } from 'genres/genres.module';
import { MoviesModule } from 'movies/movies.module';

import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';

@Module({
  imports: [GenresModule, MoviesModule],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
