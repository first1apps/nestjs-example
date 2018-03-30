import { Module } from '@nestjs/common';
import { AnimalModule } from '@my/animal-api-server';
import { sharedServicesForRoot } from '@my/api-shared';
import * as config from 'config';

@Module({
  imports: [AnimalModule],
  controllers: [],
  components: [...sharedServicesForRoot(), { provide: 'ConfigToken', useValue: config }],
})
export class ApplicationModule {}
