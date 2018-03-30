import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SerialValidationPipe } from '@my/api-shared';

import { ApplicationModule } from './application.module';

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS Example API')
    .setDescription('NestJS Example API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/.swagger/ui', app, document);

  await app.listen(3000);
}
