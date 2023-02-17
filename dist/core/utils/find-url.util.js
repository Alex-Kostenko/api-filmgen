"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUrlUtil = void 0;
const main_1 = require("../constants/main");
const findUrlUtil = (value) => {
    const url = value.match(main_1.urlRegex);
    return url.at(0);
};
exports.findUrlUtil = findUrlUtil;
//# sourceMappingURL=find-url.util.js.map