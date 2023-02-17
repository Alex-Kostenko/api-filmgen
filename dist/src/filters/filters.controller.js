"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_all_filters_response_dto_1 = require("./dto/get-all-filters.response.dto");
const filters_service_1 = require("./filters.service");
let FiltersController = class FiltersController {
    constructor(filtersService) {
        this.filtersService = filtersService;
    }
    findAllGenres() {
        return this.filtersService.findAll();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all filters' }),
    (0, swagger_1.ApiOkResponse)({ type: get_all_filters_response_dto_1.GetAllFiltersRes }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FiltersController.prototype, "findAllGenres", null);
FiltersController = __decorate([
    (0, swagger_1.ApiTags)('Filters'),
    (0, common_1.Controller)('filters'),
    __metadata("design:paramtypes", [filters_service_1.FiltersService])
], FiltersController);
exports.FiltersController = FiltersController;
//# sourceMappingURL=filters.controller.js.map