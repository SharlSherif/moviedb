import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './entities/movie.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import MongooseRepository from 'src/classes/mongoose.repository';

@Injectable()
export class MovieService {
  repository: MongooseRepository<MovieDocument>;

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {
    this.repository = new MongooseRepository<MovieDocument>(movieModel);
  }
}
