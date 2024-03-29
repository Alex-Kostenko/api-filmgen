import { MovieEntity } from '../../src/movies/entities/movie.entity';

export interface IPositiveRequest {
  success: boolean;
}

export interface IPagination {
  page: number;
  results: MovieEntity[];
  total_pages: number;
  total_results: number;
}

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export interface IPositiveRequest {
  success: boolean;
}

export interface TODO_ANY {
  [name: string]: any;
}
