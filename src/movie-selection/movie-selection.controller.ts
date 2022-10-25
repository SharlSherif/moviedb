import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieSelectionService } from './movie-selection.service';
import { CreateMovieSelectionDto } from './dto/create-movie-selection.dto';
import { UpdateMovieSelectionDto } from './dto/update-movie-selection.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Controller('movies-selections')
export class MovieSelectionController {
  constructor(private readonly movieSelectionService: MovieSelectionService) {}

  @Post()
  async create(@Body() createMovieSelectionDto: CreateMovieSelectionDto) {
    return await this.movieSelectionService.createOrUpdateMovieSelections(
      createMovieSelectionDto.selections,
    );
  }

  @Get()
  findAll() {
    return this.movieSelectionService.list(123);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieSelectionService.repository.getById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieSelectionService.repository.deleteById(id);
  }
}
