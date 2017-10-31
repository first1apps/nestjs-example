import { Controller, Get } from '@nestjs/common';
import { SwaggerData } from './swagger-data';

@Controller('.swagger')
export class SwaggerController {
    constructor() {
    }

    @Get()
    json() {
        return SwaggerData.document;
    }
}
