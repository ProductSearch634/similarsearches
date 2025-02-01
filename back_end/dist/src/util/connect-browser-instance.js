"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToBrowserInstance = void 0;
const lodash_1 = require("lodash");
const puppeteer_1 = __importDefault(require("puppeteer"));
const to_1 = require("./to");
const connectToBrowserInstance = async (opts = {}, logger) => {
    const childLogger = logger?.child({ name: 'connect-to-browser-instance' });
    childLogger?.debug('Connecting to Puppeteer instance');
    const [err, browser] = await (0, to_1.to)(puppeteer_1.default.connect(opts));
    if (!(0, lodash_1.isNull)(err)) {
        childLogger?.error(err);
        process.exit(2);
    }
    if ((0, lodash_1.isUndefined)(browser)) {
        childLogger?.error('Error: unable to connect with browser instance');
        process.exit(2);
    }
    childLogger?.debug('Connected to Puppeteer instance');
    return browser;
};
exports.connectToBrowserInstance = connectToBrowserInstance;
//# sourceMappingURL=connect-browser-instance.js.map