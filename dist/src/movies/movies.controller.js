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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_last_popular_dto_1 = require("./dto/get-last-popular.dto");
const get_movie_by_id_dto_1 = require("./dto/get-movie-by-id.dto");
const paginate_movie_dto_1 = require("./dto/paginate-movie.dto");
const pagination_body_dto_1 = require("./dto/pagination-body.dto");
const pagination_result_dto_1 = require("./dto/pagination.result.dto");
const movie_entity_1 = require("./entities/movie.entity");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async findLastPopular(getLastPopularDto) {
        return this.moviesService.findLastPopular(getLastPopularDto.moviesAmount);
    }
    async findAllPaginate(paginateMoviesDto, paginationBodyDTO) {
        return this.moviesService.findAllPaginate(paginateMoviesDto, paginationBodyDTO);
    }
    async findMovieById(getMovieByIdDto) {
        return this.moviesService.findMovieById(getMovieByIdDto.movieId);
    }
    fetch() {
        return this.moviesService.fetchMovies();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get last popular' }),
    (0, swagger_1.ApiOkResponse)({
        type: movie_entity_1.MovieEntity,
        isArray: true,
    }),
    (0, common_1.Get)('last-popular'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_last_popular_dto_1.GetLastPopularDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findLastPopular", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get movie with pagination, sort and filter' }),
    (0, swagger_1.ApiOkResponse)({
        type: pagination_result_dto_1.PaginationResDTO,
    }),
    (0, common_1.Post)('pagination'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginate_movie_dto_1.PaginateMoviesDto,
        pagination_body_dto_1.PaginationBodyDTO]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findAllPaginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get movie by ID' }),
    (0, swagger_1.ApiOkResponse)({
        type: movie_entity_1.MovieEntity,
    }),
    (0, common_1.Get)('get-by-id/:movieId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_movie_by_id_dto_1.GetMovieByIdDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findMovieById", null);
MoviesController = __decorate([
    (0, swagger_1.ApiTags)('Movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.default])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map