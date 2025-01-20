import { Browser, Page } from "puppeteer";

export async function freeResources(browser: Browser, connectedBrowser: Browser, page?: Page, newPage?: Page) {
    if (newPage) await newPage.close();
    if (page) await page.close();
    if (connectedBrowser) await connectedBrowser.close();
    if (browser) await browser.close();
  }