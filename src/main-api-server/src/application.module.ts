import { Module, MiddlewaresConsumer, NestModule } from '@nestjs/common';
import { ApiSharedModule } from '@my/api-shared';
import { AnimalModule } from '@my/animal-api-server';
import * as config from 'config';
import { DbModule, DbConnectionOptions } from '@my/db';
import { RequestContext } from '@my/api-shared';
import { AuthModule } from '@my/auth-api';
import { ZoneMiddleware } from 'nestjs-zone';
import { PhotoModule } from '@my/photo-api';

const dbConnection = config.get<DbConnectionOptions>('dbConnection');
const rootDbModule = DbModule.forRoot(dbConnection);

@Module({
  imports: [
    // Shared Modules
    ApiSharedModule,
    rootDbModule,

    // Controller Modules
    AnimalModule,
    AuthModule,
    PhotoModule,
  ],
  exports: [ApiSharedModule, rootDbModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(
        ZoneMiddleware.create<RequestContext>((req, res) => {
          const requestContext = new RequestContext(req, res);
          const nextZoneSpec: ZoneSpec = {
            name: RequestContext.zoneKey,
            properties: {
              [RequestContext.zoneKey]: requestContext,
            },
          };
          return nextZoneSpec;
        }),
      )
      .forRoutes({ path: '*' });
  }
}
