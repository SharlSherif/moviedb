import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    exposedHeaders: ['Authorize'],
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Enctype, enctype',
    origin: '*',
  });
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log('MovieDB is listening on port ' + PORT);
}
bootstrap();
