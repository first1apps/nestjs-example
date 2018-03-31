import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  SerialValidationPipe,
  AppConfigService,
  ApiSharedModule,
} from '@my/api-shared';

import { ApplicationModule } from './application.module';
import { INestApplication } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const appConfig = app
    .select(ApiSharedModule)
    .get<AppConfigService>(AppConfigService);
  setupSwagger(app, appConfig);
  await app.listen(appConfig.port);
}

function setupSwagger(app: INestApplication, appConfig: AppConfigService) {
  const options = new DocumentBuilder()
    .setTitle(appConfig.appName)
    .setDescription(appConfig.appDescription)
    .setVersion(appConfig.appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  //Add securityDefinitions to the api specification
  (document as any)['securityDefinitions'] = {
    'jwt-auth': {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  };

  (document as any)['security'] = { 'jwt-auth': [] };

  SwaggerModule.setup('/.swagger/ui', app, document);
  app.use('/.swagger/json', (req, res, next) => res.send(document));
}
