import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { DbModule } from '@my/db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@my/db';

@Module({
  imports: [DbModule],
  components: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
