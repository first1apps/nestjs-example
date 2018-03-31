import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from '@my/api-shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import * as e from './entities';
import { DbService } from './db.service';
import { DbConnectionOptions } from './db-connection-options';
import { ConnectionOptions as TypeOrmConnectionOptions } from 'typeorm';

const entities = [e.Photo, e.User, e.Session];
const featureTypeormModules = TypeOrmModule.forFeature(entities);

@Module({
  imports: [featureTypeormModules],
  components: [DbService],
  exports: [DbService, featureTypeormModules],
})
export class DbModule {
  static forRoot(dbConnectionOptions: DbConnectionOptions) {
    const typeormConnectionOptions: TypeOrmConnectionOptions = {
      type: 'postgres',
      schema: 'public',
      host: dbConnectionOptions.host,
      port: dbConnectionOptions.port,
      username: dbConnectionOptions.username,
      password: dbConnectionOptions.password,
      database: dbConnectionOptions.database,
      ssl: dbConnectionOptions.ssl,
      synchronize: false, // DO NOT EVER SET TO TRUE, EVEN IN DEVELOPMENT
      logging: false,
      entities: entities,
    };
    if (typeormConnectionOptions.synchronize) {
      throw new Error('Never set typeorm synchornize to true!');
    }
    const rootTypeormModule = TypeOrmModule.forRoot(typeormConnectionOptions);
    return rootTypeormModule;
  }
}
