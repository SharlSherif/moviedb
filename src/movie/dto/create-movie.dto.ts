import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsBoolean()
  adult: boolean;
  @IsNotEmpty()
  backdrop_path: string;
  @IsNotEmpty()
  @IsArray()
  genre_ids: number[];
  @IsNotEmpty()
  @IsString()
  original_language: string;
  @IsNotEmpty()
  @IsString()
  original_title: string;
  @IsNotEmpty()
  overview: string;
  @IsNotEmpty()
  popularity: number;
  @IsNotEmpty()
  @IsString()
  poster_path: string;
  @IsNotEmpty()
  @IsString()
  release_date: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsBoolean()
  video: boolean;
  @IsNotEmpty()
  @IsNumber()
  vote_average: number;
  @IsNotEmpty()
  @IsNumber()
  vote_count: number;
}
