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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const main_1 = require("../../core/enums/main");
const movie_entity_1 = require("./entities/movie.entity");
let MoviesRepository = class MoviesRepository {
    constructor(movieEntity) {
        this.movieEntity = movieEntity;
    }
    async findAllPaginate(paginateMoviesDto, paginationBodyDTO) {
        var _a, e_1, _b, _c;
        const { pageSize, page, searchTerm, orderBy, dir } = paginateMoviesDto;
        const currentTime = new Date();
        const currentYear = currentTime.getFullYear();
        const query = this.movieEntity.createQueryBuilder('movies');
        query.orderBy(`movies.${orderBy ? orderBy : main_1.Ordering.Popularity}`, dir === main_1.SortDirection.Descend ? 'DESC' : 'ASC');
        query.take(pageSize).skip((page - 1) * pageSize);
        if (!query)
            throw new common_1.BadRequestException('No such page');
        if (paginationBodyDTO.length) {
            try {
                for (var _d = true, paginationBodyDTO_1 = __asyncValues(paginationBodyDTO), paginationBodyDTO_1_1; paginationBodyDTO_1_1 = await paginationBodyDTO_1.next(), _a = paginationBodyDTO_1_1.done, !_a;) {
                    _c = paginationBodyDTO_1_1.value;
                    _d = false;
                    try {
                        const filter = _c;
                        this.filterMovies(query, filter, currentYear);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = paginationBodyDTO_1.return)) await _b.call(paginationBodyDTO_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (searchTerm) {
            query.where('movies.title ILIKE :title', {
                title: `%${searchTerm.trim()}%`,
            });
        }
        const totalAmount = await query.getCount();
        const totalPages = Math.ceil(totalAmount / pageSize);
        const movies = await query.getMany();
        return {
            total_results: totalAmount,
            total_pages: totalPages,
            results: movies,
            page: page,
            page_size: pageSize,
        };
    }
    async filterMovies(query, filterMoviesDto, currentYear) {
        const { from, to, field, genres_ids } = filterMoviesDto;
        switch (field) {
            case main_1.Filters.Genres:
                query.where('movies.genre_ids && :genres', { genres: genres_ids });
                break;
            case main_1.Filters.ReleaseDate:
                query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('movies.release_date >= :from', {
                        from: `${from ? from : 1990}-01-01`,
                    }).andWhere('movies.release_date <= :to', {
                        to: `${to ? to : currentYear}-12-31`,
                    });
                }));
                break;
            case main_1.Filters.VoteAverage:
                query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('movies.vote_average >= :from', {
                        from: from,
                    }).andWhere('movies.vote_average <= :to', {
                        to: to,
                    });
                }));
                break;
            case main_1.Filters.VoteCount:
                query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('movies.vote_count >= :from', {
                        from: from,
                    }).andWhere('movies.vote_count <= :to', {
                        to: to,
                    });
                }));
                break;
            default:
                break;
        }
    }
    async findMovieById(movieId) {
        const searchMovie = await this.movieEntity
            .createQueryBuilder('movies')
            .where('movies.id = :id', { id: movieId })
            .getOne();
        if (!searchMovie) {
            throw new common_1.NotFoundException('Movie is not exist');
        }
        return searchMovie;
    }
    async findLastPopular(movieAmount) {
        const serchMovies = await this.movieEntity
            .createQueryBuilder('movies')
            .orderBy('movies.popularity', 'DESC')
            .take(movieAmount)
            .getMany();
        if (!serchMovies.length)
            throw new common_1.NotFoundException('Movies are not exist');
        return serchMovies;
    }
    async getMaxMinYear() {
        const query = await this.movieEntity
            .createQueryBuilder('movies')
            .select('MAX(movies.release_date)', 'maxYear')
            .addSelect('MIN(movies.release_date)', 'minYear')
            .getRawOne();
        return {
            max_year: query.maxYear.getFullYear(),
            min_year: query.minYear.getFullYear(),
        };
    }
    async saveMovies(movies) {
        try {
            const moviesEntities = this.movieEntity.create(movies);
            await this.movieEntity.save(moviesEntities);
        }
        catch (_a) {
            throw new common_1.BadRequestException('Bad request');
        }
    }
};
MoviesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.MovieEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesRepository);
exports.MoviesRepository = MoviesRepository;
//# sourceMappingURL=movies.repository.js.map