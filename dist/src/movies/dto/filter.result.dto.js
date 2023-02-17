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
exports.FilterResDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const movie_entity_1 = require("../entities/movie.entity");
class FilterResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], FilterResDTO.prototype, "page_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], FilterResDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [movie_entity_1.MovieEntity] }),
    __metadata("design:type", Array)
], FilterResDTO.prototype, "results", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], FilterResDTO.prototype, "total_pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], FilterResDTO.prototype, "total_results", void 0);
exports.FilterResDTO = FilterResDTO;
//# sourceMappingURL=filter.result.dto.js.map