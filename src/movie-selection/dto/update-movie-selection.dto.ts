import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieSelectionDto } from './create-movie-selection.dto';

export class UpdateMovieSelectionDto extends PartialType(CreateMovieSelectionDto) {}
