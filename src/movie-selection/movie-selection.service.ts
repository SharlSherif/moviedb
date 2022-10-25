import { BadRequestException, Injectable } from '@nestjs/common';
import MongooseRepository from 'src/classes/mongoose.repository';
import {
  CreateMovieSelectionDto,
  MovieSelectionDto,
} from './dto/create-movie-selection.dto';
import { UpdateMovieSelectionDto } from './dto/update-movie-selection.dto';
import {
  MovieSelection,
  MovieSelectionDocument,
} from './entities/movie-selection.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/movie/entities/movie.entity';

@Injectable()
export class MovieSelectionService {
  repository: MongooseRepository<MovieSelectionDocument>;

  constructor(
    @InjectModel(MovieSelection.name)
    private movieSelectionModel: Model<MovieSelectionDocument>,
  ) {
    this.repository = new MongooseRepository<MovieSelectionDocument>(
      movieSelectionModel,
    );
  }

  async createOrUpdateMovieSelections(selections: MovieSelectionDto[]) {
    // this throws an error so no need to return anything
    this.vaidateRanks(selections);

    /* collecting all the update/insert operations in one array 
       so Im able to run them concurrently using Promise.all for better performance. */
    const operations = [];
    for (const selection of selections) {
      operations.push(this.findAndUpdateById(selection));
    }

    return Promise.all(operations);
  }

  findAndUpdateById(selection: MovieSelectionDto) {
    return this.repository.model
      .findOneAndUpdate({ _id: selection.movie }, selection, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      })
      .sort('rank')
      .populate('movie')
      .exec();
  }

  list(userId) {
    //todo: find by user id
    return this.repository.model.find().populate('movie').sort('rank').exec();
  }

  vaidateRanks(selections: MovieSelectionDto[]) {
    for (const selection of selections) {
      if (selections.filter((s) => s.rank == selection.rank).length > 1) {
        throw new BadRequestException(
          `one or more objects has the same rank = ${selection.rank}`,
        );
      }
    }
  }
}
