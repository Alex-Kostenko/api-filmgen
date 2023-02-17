"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = exports.Ordering = exports.SortDirection = void 0;
var SortDirection;
(function (SortDirection) {
    SortDirection["Ascend"] = "asc";
    SortDirection["Descend"] = "desc";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var Ordering;
(function (Ordering) {
    Ordering["Popularity"] = "popularity";
    Ordering["ReleaseDate"] = "release_date";
    Ordering["VoteAverage"] = "vote_average";
    Ordering["VoteCount"] = "vote_count";
})(Ordering = exports.Ordering || (exports.Ordering = {}));
var Filters;
(function (Filters) {
    Filters["ReleaseDate"] = "release_date";
    Filters["VoteAverage"] = "vote_average";
    Filters["VoteCount"] = "vote_count";
    Filters["Genres"] = "genres";
})(Filters = exports.Filters || (exports.Filters = {}));
//# sourceMappingURL=main.js.map