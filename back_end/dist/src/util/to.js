"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = void 0;
const to = async (promise) => await promise.then((data) => [null, data], (err) => [err, undefined]);
exports.to = to;
//# sourceMappingURL=to.js.map