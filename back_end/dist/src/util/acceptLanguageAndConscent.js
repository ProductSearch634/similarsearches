"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptLanguageAndTNCs = void 0;
const to_1 = require("./to");
const lodash_1 = require("lodash");
const acceptLanguageAndTNCs = async function (browser) {
    const [createPageErr, page] = await (0, to_1.to)(browser.newPage());
    if (!(0, lodash_1.isNull)(createPageErr)) {
        console.log('Error while creating page', createPageErr);
        return;
    }
    try {
        const [mainErr] = await (0, to_1.to)(page.goto('https://www.bol.com/be/nl/l/literaire-romans/40492/?page=2&showAll=true&view=list'));
        if (!(0, lodash_1.isNull)(mainErr)) {
            if (mainErr.message.includes('ERR_TUNNEL_CONNECTION_FAILED')) {
                console.log('Proxy is not working!');
                return;
            }
            else {
                throw mainErr; // Throw other errors for handling
            }
        }
        // Wait for the consent modal button
        // await page.waitForSelector('[data-test="consent-modal-ofc-confirm-btn"]');
        // const consentButton = await page.$('[data-test="consent-modal-ofc-confirm-btn"]');
        // if (consentButton) {
        //   await consentButton.click();
        //   console.log('Clicked consent button.');
        //   await page.waitForTimeout(5000); // Example delay after clicking
        // }
    }
    catch (error) {
        console.error('Error occurred:', error);
        throw new Error('Terms and condition not accepted');
    }
    finally {
        await page.close();
    }
};
exports.acceptLanguageAndTNCs = acceptLanguageAndTNCs;
//# sourceMappingURL=acceptLanguageAndConscent.js.map