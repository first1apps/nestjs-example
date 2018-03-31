import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiSharedModule } from '@my/api-shared';
import { AnimalModule } from '@my/animal-api-server';
import * as config from 'config';
import { DbModule } from '@my/db';

@Module({
  imports: [AnimalModule, DbModule],
  controllers: [],
  components: [...ApiSharedModule.rootProviders(config)],
})
export class ApplicationModule {}
