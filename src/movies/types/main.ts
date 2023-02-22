import { IPagination } from '../../../core/types/main';

export interface IMovie {
  id: number;
  name: string;
}

export interface IMoviesPagination extends IPagination {
  page_size: number;
}

export interface IMoviesUrls {
  link: string;
  site: string;
}

export interface IMovieTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IMovieTrailerResult {
  id: number;
  results: IMovieTrailer[];
}
