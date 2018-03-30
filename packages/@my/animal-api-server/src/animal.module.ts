import { Module } from '@nestjs/common';
import { CatController, CatService } from './cat';

@Module({
  modules: [],
  controllers: [CatController],
  components: [CatService],
})
export class AnimalModule {}
