import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IPositiveRequest } from '../../core/types/main';

import { GetLastPopularDto } from './dto/get-last-popular.dto';
import { GetMovieByIdDto } from './dto/get-movie-by-id.dto';
import { PaginateMoviesDto } from './dto/paginate-movie.dto';
import { PaginationBodyDTO } from './dto/pagination-body.dto';
import { PaginationResDTO } from './dto/pagination.result.dto';
import { MovieEntity } from './entities/movie.entity';
import MoviesService from './movies.service';
import { IFindMovieById } from './types/main';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get last popular' })
  @ApiOkResponse({
    type: MovieEntity,
    isArray: true,
  })
  @Get('last-popular')
  async findLastPopular(
    @Query() getLastPopularDto: GetLastPopularDto,
  ): Promise<MovieEntity[]> {
    return this.moviesService.findLastPopular(getLastPopularDto.moviesAmount);
  }

  @ApiOperation({ summary: 'Get movie with pagination, sort and filter' })
  @ApiOkResponse({
    type: PaginationResDTO,
  })
  @Post('pagination')
  async findAllPaginate(
    @Query() paginateMoviesDto: PaginateMoviesDto,
    @Body() paginationBodyDTO: PaginationBodyDTO,
  ): Promise<PaginationResDTO> {
    return this.moviesService.findAllPaginate(
      paginateMoviesDto,
      paginationBodyDTO,
    );
  }

  @ApiOperation({ summary: 'Get movie by ID' })
  @ApiOkResponse({
    type: MovieEntity,
  })
  @Get('get-by-id/:movieId')
  async findMovieById(
    @Param() getMovieByIdDto: GetMovieByIdDto,
  ): Promise<IFindMovieById> {
    return this.moviesService.findMovieById(getMovieByIdDto.movieId);
  }

  @Delete('delete-by-year/:year')
  async remove(@Param('year') year: number): Promise<IPositiveRequest> {
    return this.moviesService.remove(year);
  }

  @Get('copy')
  async copyFilms(): Promise<IPositiveRequest> {
    return this.moviesService.copyMovies();
  }

  // @Cron(CronExpression.EVERY_DAY_AT_10AM)
  fetch(): Promise<IPositiveRequest> {
    return this.moviesService.fetchMovies();
  }
}
