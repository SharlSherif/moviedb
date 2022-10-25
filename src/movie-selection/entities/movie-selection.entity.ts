import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';
import { Movie } from 'src/movie/entities/movie.entity';

@Schema()
export class MovieSelection {
  @Prop({ ref: Movie.name, required: true })
  movie: Types.ObjectId;
  //todo make user collection
  //   @Prop({ ref: Movie.name, required: true })
  //   userId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  rank: number;
}

export type MovieSelectionDocument = MovieSelection & Document;

export const MovieSelectionSchema =
  SchemaFactory.createForClass(MovieSelection);
export const MovieSelectionModel = model(
  'Movies-Selections',
  MovieSelectionSchema,
);

// {
//     "adult": false,
//     "backdrop_path": "/4Xkbglp4o5wDpVmnY8r3g21pAWS.jpg",
//     "genre_ids": [
//         80,
//         18,
//         53,
//         9648
//     ],
//     "id": 10354,
//     "original_language": "en",
//     "original_title": "True Crime",
//     "overview": "Boozer, skirt chaser, careless father. You could create your own list of reporter Steve Everetts faults but theres no time. A San Quentin Death Row prisoner is slated to die at midnight – a man Everett has suddenly realized is innocent.",
//     "popularity": 12.638,
//     "poster_path": "/aZnlxXwMgk68gIKezbMkzKY8eyi.jpg",
//     "release_date": "1999-03-19",
//     "title": "True Crime",
//     "video": false,
//     "vote_average": 6.6,
//     "vote_count": 590
// },
