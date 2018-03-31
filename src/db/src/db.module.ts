import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from '@my/api-shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import * as e from './entities';
import { DbService } from './db.service';

const dbConnection: any = config.get('dbConnection'); // TODO This should come from the AppConfigService but dunno how

const entities = [e.Photo, e.User, e.Session];

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

const featureTypeormModules = TypeOrmModule.forFeature(entities);


@Module({
  imports: [rootTypeormModule, featureTypeormModules],
  components: [DbService],
  exports: [DbService, rootTypeormModule, featureTypeormModules],
})
export class DbModule {}
