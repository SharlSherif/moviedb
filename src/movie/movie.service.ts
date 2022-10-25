import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './entities/movie.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import MongooseRepository from 'src/classes/mongoose.repository';
import * as axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MovieService {
  repository: MongooseRepository<MovieDocument>;

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {
    this.repository = new MongooseRepository<MovieDocument>(movieModel);
  }

  async fetchMovies(query: string): Promise<Movie[]> {
    try {
      const queryString = new URLSearchParams(query);
      const moviesList = await this.httpService.axiosRef.get(
        `${process.env.THEMOVIEDB_API_URL}search/movie?query=${queryString}&language=en-US&page=1&include_adult=false&api_key=${process.env.THEMOVIEDB_API_KEY}`,
      );
      return moviesList.data;
    } catch (err) {
      throw new BadRequestException(err.toString());
    }
  }
}
