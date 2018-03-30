import { Module } from '@nestjs/common';
import { AnimalModule } from '@my/animal-api-server';

@Module({
  modules: [AnimalModule],
  imports: [],
  controllers: [],
})
export class ApplicationModule {}
