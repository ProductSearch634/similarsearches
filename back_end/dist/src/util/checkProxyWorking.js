"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProxyWorking = void 0;
const lodash_1 = require("lodash");
const connect_to_browser_instance_1 = require("../connect-to-browser-instance");
const to_1 = require("./to");
const checkProxyWorking = async (ws) => {
    const browser = await (0, connect_to_browser_instance_1.connectToBrowserInstance)({
        browserWSEndpoint: ws,
        defaultViewport: { isMobile: true, width: 900, height: 1280 },
    });
    const [createPageErr, page] = await (0, to_1.to)(browser.newPage());
    if (!(0, lodash_1.isNull)(createPageErr)) {
        throw 'error while creating page';
    }
    await page.close();
};
exports.checkProxyWorking = checkProxyWorking;
//# sourceMappingURL=checkProxyWorking.js.map