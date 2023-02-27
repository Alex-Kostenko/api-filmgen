import { Test, TestingModule } from '@nestjs/testing';
import { MoviesRepository } from './movies.repository';
import MoviesService from './movies.service';

describe('UsersService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, MoviesRepository],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
