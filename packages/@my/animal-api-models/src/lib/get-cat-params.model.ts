import { IsString, IsInt, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { CatFilters } from './cat-filters.model';

export class GetCatParams {
    @IsOptional()
    @ValidateNested()
    @Type(() => CatFilters)
    readonly filters?: CatFilters;
}
