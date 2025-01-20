import { Browser } from "puppeteer"
import { to } from "./to";
import { isNull } from "lodash";

export const acceptLanguageAndTNCs = async function(browser: Browser) {
  const [createPageErr, page] = await to(browser.newPage());

  if (!isNull(createPageErr)) {
    console.log('Error while creating page', createPageErr);
    return;
  }

  try {
    const [mainErr] = await to(
      page.goto('https://www.bol.com/be/nl/l/literaire-romans/40492/?page=2&showAll=true&view=list')
    );

    if (!isNull(mainErr)) {
      if (mainErr.message.includes('ERR_TUNNEL_CONNECTION_FAILED')) {
        console.log('Proxy is not working!');
        return;
      } else {
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

  } catch (error) {
    console.error('Error occurred:', error);
    throw new Error('Terms and condition not accepted')
  } finally {
    await page.close();
  }
}
