import { Component } from '@nestjs/common';
import { GetCatParams } from '@my/animal-api-models';

@Component()
export class CatService {
  findAll(getCatParams?: GetCatParams) {
    return getCatParams;
  }
}
