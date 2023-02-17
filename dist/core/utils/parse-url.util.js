"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrlUtil = void 0;
const parseUrlUtil = (value) => {
    const url = value
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        .replace(/\s/g, '+');
    return url;
};
exports.parseUrlUtil = parseUrlUtil;
//# sourceMappingURL=parse-url.util.js.map