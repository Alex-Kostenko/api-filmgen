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
exports.FiltersService = void 0;
const common_1 = require("@nestjs/common");
const genres_repository_1 = require("../genres/genres.repository");
const movies_repository_1 = require("../movies/movies.repository");
let FiltersService = class FiltersService {
    constructor(genresRepository, moviesRepository) {
        this.genresRepository = genresRepository;
        this.moviesRepository = moviesRepository;
    }
    async findAll() {
        const genres = await this.genresRepository.findAll();
        const yearFilter = await this.moviesRepository.getMaxMinYear();
        return Object.assign({ genres: genres }, yearFilter);
    }
};
FiltersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genres_repository_1.GenresRepository,
        movies_repository_1.MoviesRepository])
], FiltersService);
exports.FiltersService = FiltersService;
//# sourceMappingURL=filters.service.js.map