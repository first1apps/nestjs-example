import { Controller, Get, Post, Body } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {
    console.log('New PhotoController');
  }

  @Get()
  async findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Post()
  async create(@Body() photo: Photo): Promise<Photo> {
    console.log('creating photo', photo);
    return this.photoService.create(photo);
  }
}

/*{
    "name": "abc",
    "description": "123",
    "filename": "xyz.png",
    "views": 10,
    "isPublished": true
}*/
