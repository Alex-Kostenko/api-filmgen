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
exports.PaginateMoviesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const paginate_dto_1 = require("../../../core/dto/paginate.dto");
const main_1 = require("../../../core/enums/main");
class PaginateMoviesDto extends paginate_dto_1.PaginateDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, name: 'searchTerm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(400),
    __metadata("design:type", String)
], PaginateMoviesDto.prototype, "searchTerm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: main_1.SortDirection,
        name: 'dir',
        default: main_1.SortDirection.Descend,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(main_1.SortDirection),
    __metadata("design:type", String)
], PaginateMoviesDto.prototype, "dir", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: main_1.Ordering,
        name: 'orderBy',
        default: main_1.Ordering.Popularity,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(main_1.Ordering),
    __metadata("design:type", String)
], PaginateMoviesDto.prototype, "orderBy", void 0);
exports.PaginateMoviesDto = PaginateMoviesDto;
//# sourceMappingURL=paginate-movie.dto.js.map