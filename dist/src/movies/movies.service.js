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
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const form_data_1 = require("form-data");
const find_url_util_1 = require("../../core/utils/find-url.util");
const parse_url_util_1 = require("../../core/utils/parse-url.util");
const movies_repository_1 = require("./movies.repository");
let MoviesService = class MoviesService {
    constructor(moviesRepository, httpService) {
        this.moviesRepository = moviesRepository;
        this.httpService = httpService;
    }
    async findAllPaginate(paginateMoviesDto, paginationBodyDTO) {
        const result = await this.moviesRepository.findAllPaginate(paginateMoviesDto, paginationBodyDTO.filters);
        return Object.assign({ data: result }, paginationBodyDTO);
    }
    async findMovieById(movieId) {
        const movie = await this.moviesRepository.findMovieById(movieId);
        const { original_title, title } = movie;
        return Object.assign(Object.assign({}, movie), { urls: [
                { link: await this.findRezkaUrl(title), site: 'rezka' },
                {
                    link: original_title && (await this.findMicrosoftUrl(original_title)),
                    site: 'microsoft',
                },
            ] });
    }
    async findMicrosoftUrl(title) {
        var _a, _b, _c;
        try {
            const microsoftData = await this.httpService.axiosRef.get(`https://www.microsoft.com/msstoreapiprod/api/autosuggest?market=en-us&sources=Iris-Products%2CDCatAll-Products%2CMicrosoft-Terms&query=${(0, parse_url_util_1.parseUrlUtil)(title)}`);
            const microsoftUrl = (_c = (_b = (_a = microsoftData === null || microsoftData === void 0 ? void 0 : microsoftData.data) === null || _a === void 0 ? void 0 : _a.ResultSets[0]) === null || _b === void 0 ? void 0 : _b.Suggests) === null || _c === void 0 ? void 0 : _c.find(({ Source }) => Source === 'Movie');
            return microsoftUrl.Url.replace('//', '');
        }
        catch (_d) {
            return null;
        }
    }
    async findRezkaUrl(title) {
        try {
            const bodyData = new form_data_1.default();
            bodyData.append('q', title);
            const rezkaData = await this.httpService.axiosRef.post(process.env.REZKA_URL, bodyData);
            const rezkaUrl = (0, find_url_util_1.findUrlUtil)(rezkaData.data);
            return rezkaUrl;
        }
        catch (_a) {
            return null;
        }
    }
    async findLastPopular(getLastPopularDto) {
        return this.moviesRepository.findLastPopular(getLastPopularDto);
    }
    async getMaxMinYear() {
        return this.moviesRepository.getMaxMinYear();
    }
    async fetchMovies() {
        let page = 1;
        const sort_by = 'primary_release_date.asc';
        const primary_release_date = new Date().toJSON().slice(0, 10);
        setInterval(async () => {
            const { data } = await this.httpService.axiosRef.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=${sort_by}&include_adult=true&page=${page}&language=ru&primary_release_date.gte=${primary_release_date}`);
            if (data) {
                throw new common_1.BadRequestException('Not found');
            }
            this.moviesRepository.saveMovies(data.results);
            page++;
        }, 3000);
        return { success: true };
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movies_repository_1.MoviesRepository,
        axios_1.HttpService])
], MoviesService);
exports.default = MoviesService;
//# sourceMappingURL=movies.service.js.map