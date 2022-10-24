import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';

@Schema()
export class Movie {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  adult: boolean;
  @Prop({ required: true })
  backdrop_path: string;
  @Prop({ required: true })
  genre_ids: number[];
  @Prop({ required: true })
  original_language: string;
  @Prop({ required: true })
  original_title: string;
  @Prop({ required: true })
  overview: string;
  @Prop({ required: true })
  popularity: number;
  @Prop({ required: true })
  poster_path: string;
  @Prop({ required: true })
  release_date: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  video: boolean;
  @Prop({ required: true })
  vote_average: number;
  @Prop({ required: true })
  vote_count: number;
}

export type MovieDocument = Movie & Document;

export const MovieSchema = SchemaFactory.createForClass(Movie);
export const MovieModel = model('Movies', MovieSchema);

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
