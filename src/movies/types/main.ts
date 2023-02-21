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
