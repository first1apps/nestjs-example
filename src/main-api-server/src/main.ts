import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SerialValidationPipe, AppConfigService } from '@my/api-shared';

import { ApplicationModule } from './application.module';

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const appConfig = app.get<AppConfigService>(AppConfigService);

  const options = new DocumentBuilder()
    .setTitle(appConfig.appName)
    .setDescription(appConfig.appDescription)
    .setVersion(appConfig.appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/.swagger/ui', app, document);

  await app.listen(appConfig.port);
}
