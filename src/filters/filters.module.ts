import { Module } from '@nestjs/common';

import { MoviesModule } from '../movies/movies.module';

import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';

@Module({
  imports: [MoviesModule],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
