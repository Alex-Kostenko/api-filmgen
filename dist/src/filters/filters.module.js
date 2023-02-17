"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersModule = void 0;
const common_1 = require("@nestjs/common");
const genres_module_1 = require("../genres/genres.module");
const movies_module_1 = require("../movies/movies.module");
const filters_controller_1 = require("./filters.controller");
const filters_service_1 = require("./filters.service");
let FiltersModule = class FiltersModule {
};
FiltersModule = __decorate([
    (0, common_1.Module)({
        imports: [genres_module_1.GenresModule, movies_module_1.MoviesModule],
        controllers: [filters_controller_1.FiltersController],
        providers: [filters_service_1.FiltersService],
    })
], FiltersModule);
exports.FiltersModule = FiltersModule;
//# sourceMappingURL=filters.module.js.map