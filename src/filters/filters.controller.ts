import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetAllFiltersRes } from './dto/get-all-filters.response.dto';
import { FiltersService } from './filters.service';

@ApiTags('Filters')
@Controller('filters')
export class FiltersController {
  constructor(private filtersService: FiltersService) {}

  @ApiOperation({ summary: 'Get all filters' })
  @ApiOkResponse({ type: GetAllFiltersRes })
  @Get('all')
  findAllFilters(): Promise<GetAllFiltersRes> {
    return this.filtersService.findAll();
  }
}
