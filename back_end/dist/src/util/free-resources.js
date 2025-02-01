"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeResources = freeResources;
async function freeResources(browser, connectedBrowser, page, newPage) {
    if (newPage)
        await newPage.close();
    if (page)
        await page.close();
    if (connectedBrowser)
        await connectedBrowser.close();
    if (browser)
        await browser.close();
}
//# sourceMappingURL=free-resources.js.map