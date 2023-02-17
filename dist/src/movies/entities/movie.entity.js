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
exports.MovieEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let MovieEntity = class MovieEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 34234 }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], MovieEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MovieEntity.prototype, "adult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MovieEntity.prototype, "backdrop_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, isArray: true }),
    (0, typeorm_1.Column)('int', { array: true }),
    __metadata("design:type", Array)
], MovieEntity.prototype, "genre_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "original_language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "original_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, default: '' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "overview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, typeorm_1.Column)({ type: 'real', nullable: false, default: 0.0 }),
    __metadata("design:type", Number)
], MovieEntity.prototype, "popularity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MovieEntity.prototype, "poster_path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2021-20-20' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], MovieEntity.prototype, "release_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], MovieEntity.prototype, "video", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, typeorm_1.Column)({ type: 'real', nullable: false, default: 0.0 }),
    __metadata("design:type", Number)
], MovieEntity.prototype, "vote_average", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], MovieEntity.prototype, "vote_count", void 0);
MovieEntity = __decorate([
    (0, typeorm_1.Entity)('movies')
], MovieEntity);
exports.MovieEntity = MovieEntity;
//# sourceMappingURL=movie.entity.js.map