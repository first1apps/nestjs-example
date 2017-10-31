import { Module } from '@nestjs/common';
import { CatController } from './controllers';
import { CatService } from './services';

@Module({
    modules: [],
    controllers: [CatController],
    components: [CatService],
})
export class AnimalModule { }
