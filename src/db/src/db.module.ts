import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from '@my/api-shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import * as e from './entities';

const dbConnection: any = config.get('dbConnection'); // TODO This should come from the AppConfigService but dunno how

const entities = [e.Photo, e.User];

const rootTypeormModule = TypeOrmModule.forRoot({
  type: 'postgres',
  schema: 'public',
  host: dbConnection.host,
  port: dbConnection.port,
  username: dbConnection.user,
  password: dbConnection.password,
  database: dbConnection.database,
  ssl: dbConnection.ssl,
  synchronize: false, // DO NOT EVER SET TO TRUE, EVEN IN DEVELOPMENT
  logging: false,
  entities: entities,
});

const featureModules = TypeOrmModule.forFeature(entities);

@Module({
  imports: [rootTypeormModule, featureModules],
  exports: [rootTypeormModule, featureModules],
})
export class DbModule {}
