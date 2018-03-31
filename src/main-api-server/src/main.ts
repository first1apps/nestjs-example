import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  SerialValidationPipe,
  AppConfigService,
  ApiSharedModule,
} from '@my/api-shared';

import { ApplicationModule } from './application.module';
import { INestApplication } from '@nestjs/common';
import { DbModule, DbService } from '@my/db';
import { Connection } from 'typeorm';

export async function makeApp() {
  const app = await NestFactory.create(ApplicationModule);
  const appConfig = app
    .select(ApiSharedModule)
    .get<AppConfigService>(AppConfigService);
  return { app, appConfig };
}

export async function bootstrap() {
  const { app, appConfig } = await makeApp();
  setupSwagger(app, appConfig);
  await app.listen(appConfig.port);
  return app;
}

export async function syncDatabase() {
  const { app, appConfig } = await makeApp();
  if (!appConfig.allowDbStructureSync) {
    throw new Error(
      'Cannot sync database structure: allowDbStructureSync is false.',
    );
  }

  const dbConnectionService = app.select(DbModule).get<any>(DbService);
  await dbConnectionService.connection.synchronize();
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

  (document as any)['security'] = [{ 'jwt-auth': [] }];

  SwaggerModule.setup('/.swagger/ui', app, document);
  app.use('/.swagger/json', (req, res, next) => res.send(document));
}
