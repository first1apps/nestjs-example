import { Module, MiddlewaresConsumer, NestModule } from '@nestjs/common';
import { ApiSharedModule } from '@my/api-shared';
import { AnimalModule } from '@my/animal-api-server';
import * as config from 'config';
import { DbModule } from '@my/db';
import { RequestContext } from '@my/api-shared';
import { AuthModule } from '@my/auth-api';
import { ZoneMiddleware } from 'nestjs-zone';
import { PhotoModule } from '@my/photo-api';

@Module({
  imports: [
    // Shared Modules
    ApiSharedModule,
    DbModule,

    // Controller Modules
    AnimalModule,
    AuthModule,
    PhotoModule,
  ],
  exports: [ApiSharedModule, DbModule],
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
