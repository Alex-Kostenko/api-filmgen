import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductionCompaniesModule } from '../production_companies/production_companies.module';

import { MovieEntity } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import MoviesService from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    HttpModule,
    ProductionCompaniesModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesRepository],
})
export class MoviesModule {}
