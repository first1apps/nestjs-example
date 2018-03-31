import { Module, MiddlewaresConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiSharedModule } from '@my/api-shared';
import { AnimalModule } from '@my/animal-api-server';
import * as config from 'config';
import { DbModule } from '@my/db';
import { RequestContextMiddleware } from 'nestjs-request-context';
import { RequestContext } from '@my/api-shared';

@Module({
  imports: [AnimalModule, DbModule],
  controllers: [],
  components: [...ApiSharedModule.rootProviders(config)],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(
        RequestContextMiddleware.for<RequestContext>(RequestContext.zoneKey, (req, res) => {
          return new RequestContext(req, res);
        }),
      )
      .forRoutes({ path: '*' });
  }
}
