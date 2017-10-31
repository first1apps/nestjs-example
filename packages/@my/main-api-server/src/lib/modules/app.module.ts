import { Module } from '@nestjs/common';
import { AnimalModule } from '@my/animal-api-server';

import { SwaggerModule } from './swagger/swagger.module';

@Module({
    modules: [
        AnimalModule,
        SwaggerModule,
    ],
})
export class ApplicationModule {}