import { Controller, Get, Query } from '@nestjs/common';

import { SerialValidationPipe } from '@my/api-shared';
import { GetCatParams } from '@my/animal-api-models/index';

import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(public catService: CatService) {}

  @Get()
  findAll(@Query() params?: GetCatParams) {
    return this.catService.findAll(params);
  }
}
