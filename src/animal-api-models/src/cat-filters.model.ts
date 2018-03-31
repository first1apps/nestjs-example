import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';

export class CatFilters {
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly name?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly age?: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly breed?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly dateOfBirth?: Date;
}
