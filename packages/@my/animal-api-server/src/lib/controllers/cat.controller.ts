import { Controller, Get, Query } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';

import { SerialValidationPipe } from '@my/api-shared';
import { GetCatParams } from '@my/animal-api-models/index';

import { CatService } from '../services/index';

@Controller('cat')
export class CatController {
    constructor(public catService: CatService) {
    }

    @Get()
    findAll(@Query() params?: GetCatParams) {
        return this.catService.findAll(params);
    }
}
