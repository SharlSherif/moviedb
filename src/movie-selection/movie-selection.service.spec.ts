import { Test, TestingModule } from '@nestjs/testing';
import { MovieSelectionService } from './movie-selection.service';

describe('MovieSelectionService', () => {
  let service: MovieSelectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieSelectionService],
    }).compile();

    service = module.get<MovieSelectionService>(MovieSelectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
