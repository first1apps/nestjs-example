import { HttpException } from '@nestjs/core';
import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

const typesToValidate = [String, Boolean, Number, Array, Object];

@Pipe()
export class SerialValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // TODO: Return an array of the errors.
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return object;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    return !typesToValidate.find(type => metatype === type);
  }
}
