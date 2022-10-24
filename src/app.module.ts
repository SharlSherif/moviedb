import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
