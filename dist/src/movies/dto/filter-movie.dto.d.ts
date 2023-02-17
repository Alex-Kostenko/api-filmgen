import { Filters } from '../../../core/enums/main';
import { GetByIdsDto } from '../../genres/dto/get-by-ids.dto';
export declare class FilterMoviesDto extends GetByIdsDto {
    field: Filters;
    from: number;
    to: number;
}
