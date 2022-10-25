import { Module } from '@nestjs/common';
import { MovieSelectionService } from './movie-selection.service';
import { MovieSelectionController } from './movie-selection.controller';
import {
  MovieSelection,
  MovieSelectionSchema,
} from './entities/movie-selection.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MovieSelection.name,
        schema: MovieSelectionSchema,
      },
    ]),
  ],
  controllers: [MovieSelectionController],
  providers: [MovieSelectionService],
})
export class MovieSelectionModule {}
