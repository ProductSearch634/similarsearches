"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPuppeteerInstance = void 0;
const process_1 = __importDefault(require("process"));
const lodash_1 = require("lodash");
const puppeteer_1 = __importDefault(require("puppeteer"));
const to_1 = require("./to");
const createPuppeteerInstance = async (opts = {}, logger) => {
    const childLogger = logger?.child({ name: 'create-puppeteer-instance' });
    childLogger?.debug('Creating Puppeteer instance');
    const [err, browser] = await (0, to_1.to)(puppeteer_1.default.launch(opts));
    if (!(0, lodash_1.isNull)(err)) {
        childLogger?.error(err);
        process_1.default.exit(1);
    }
    if ((0, lodash_1.isUndefined)(browser)) {
        childLogger?.error('Browser instance not exist');
        process_1.default.exit(1);
    }
    childLogger?.debug('Created Puppeteer instance');
    return browser;
};
exports.createPuppeteerInstance = createPuppeteerInstance;
//# sourceMappingURL=create-pupeeteer-instance.js.map