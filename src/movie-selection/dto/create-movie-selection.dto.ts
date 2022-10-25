import { Document, model, Types } from 'mongoose';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieSelectionDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MovieSelectionDto)
  selections: MovieSelectionDto[];
}

export class MovieSelectionDto {
  @IsNotEmpty()
  movie: Types.ObjectId;
  @IsNotEmpty()
  @IsNumber()
  rank: number;
}
