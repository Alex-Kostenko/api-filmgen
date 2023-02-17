import { GetAllFiltersRes } from './dto/get-all-filters.response.dto';
import { FiltersService } from './filters.service';
export declare class FiltersController {
    private filtersService;
    constructor(filtersService: FiltersService);
    findAllGenres(): Promise<GetAllFiltersRes>;
}
