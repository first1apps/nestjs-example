import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from '@my/api-shared';
import { DbService } from './db.service';
import { PhotoModule } from './photo/photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { Photo } from './entities';

const dbConnection: any = config.get('dbConnection'); // TODO This should come from the AppConfigService but dunno how
console.log(dbConnection);

const providers = [DbService];

@Module({
  imports: [
    PhotoModule,
    TypeOrmModule.forRoot({
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
      entities: [Photo],
    }),
  ],
  components: providers,
  exports: providers,
})
export class DbModule {}
