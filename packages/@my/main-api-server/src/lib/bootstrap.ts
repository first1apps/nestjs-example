import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { SerialValidationPipe } from '@my/api-shared/index';

import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerData } from './modules/swagger/swagger-data';

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new SerialValidationPipe());

  SwaggerData.document = SwaggerModule.createDocument(app, baseSwaggerConfig);

  await app.listen(3000);
}


const baseSwaggerConfig = {
  info: {
    description: "Test",
    version: "1.0.0",
    title: "My API",
  },
  tags: [],
  host: "localhost",
  basePath: "/",
  schemes: [],
}