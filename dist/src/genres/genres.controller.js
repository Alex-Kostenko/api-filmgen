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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_by_ids_dto_1 = require("./dto/get-by-ids.dto");
const genre_entity_1 = require("./entities/genre.entity");
const genres_service_1 = require("./genres.service");
let GenresController = class GenresController {
    constructor(genresService) {
        this.genresService = genresService;
    }
    findAllGenres() {
        return this.genresService.findAll();
    }
    findByIds(idsArray) {
        return this.genresService.findByIds(idsArray);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all genres' }),
    (0, swagger_1.ApiOkResponse)({ type: genre_entity_1.GenreEntity, isArray: true }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenresController.prototype, "findAllGenres", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get genres by ids' }),
    (0, swagger_1.ApiOkResponse)({ type: genre_entity_1.GenreEntity, isArray: true }),
    (0, common_1.Post)('ids'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_ids_dto_1.GetByIdsDto]),
    __metadata("design:returntype", Promise)
], GenresController.prototype, "findByIds", null);
GenresController = __decorate([
    (0, swagger_1.ApiTags)('Genres'),
    (0, common_1.Controller)('genres'),
    __metadata("design:paramtypes", [genres_service_1.GenresService])
], GenresController);
exports.GenresController = GenresController;
//# sourceMappingURL=genres.controller.js.map