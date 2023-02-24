import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { FiltersModule } from './filters/filters.module';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';
import { ProductionCompaniesModule } from './production_companies/production_companies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FiltersModule,
    MoviesModule,
    GenresModule,
    ScheduleModule.forRoot(),
    ProductionCompaniesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
