"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestamp = exports.createLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const createLogger = (opts) => (0, pino_1.default)(opts);
exports.createLogger = createLogger;
const getTimestamp = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    var customDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `, "timestamp": ${customDateString}`;
};
exports.getTimestamp = getTimestamp;
//# sourceMappingURL=logger.js.map