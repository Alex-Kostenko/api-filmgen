import { PaginateDto } from '../../../core/dto/paginate.dto';
import { Ordering, SortDirection } from '../../../core/enums/main';
export declare class PaginateMoviesDto extends PaginateDto {
    searchTerm?: string;
    dir?: SortDirection;
    orderBy?: Ordering;
}
