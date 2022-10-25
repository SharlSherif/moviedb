import { Test, TestingModule } from '@nestjs/testing';
import { MovieSelectionController } from './movie-selection.controller';
import { MovieSelectionService } from './movie-selection.service';

describe('MovieSelectionController', () => {
  let controller: MovieSelectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieSelectionController],
      providers: [MovieSelectionService],
    }).compile();

    controller = module.get<MovieSelectionController>(MovieSelectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
