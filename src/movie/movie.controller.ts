import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieDocument } from './entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    console.log(createMovieDto);
    return await this.movieService.repository.insert(
      createMovieDto as MovieDocument,
    );
  }

  @Get()
  findAll() {
    return this.movieService.repository.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.repository.getFirst(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.repository.updateById(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.repository.deleteById(id);
  }
}
