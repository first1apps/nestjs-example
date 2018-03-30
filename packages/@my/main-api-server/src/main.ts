import { NestFactory } from '@nestjs/core';
import { SerialValidationPipe } from '@my/api-shared';

import { ApplicationModule } from './application.module';

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new SerialValidationPipe());
  await app.listen(3000);
}
