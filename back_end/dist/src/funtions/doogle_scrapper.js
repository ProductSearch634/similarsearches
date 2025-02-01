"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dooglescrappingfunc = dooglescrappingfunc;
const puppeteer_1 = __importDefault(require("puppeteer"));
const pino_1 = __importDefault(require("pino"));
/**
 * Creates a promise that resolves after a specified timeout.
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>}
 */
function waitTimeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
class GoogleLensScraper {
    constructor(proxy) {
        this.browser = null;
        this.logger = (0, pino_1.default)({
            name: 'google-lens-scraper',
            level: process.env.DEBUG ? 'debug' : 'info',
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            }
        });
        this.proxy = proxy;
    }
    async initializeBrowser() {
        try {
            this.logger.info('Initializing browser...');
            const browser = await puppeteer_1.default.launch({
                handleSIGHUP: true,
                handleSIGINT: true,
                headless: false,
                args: [
                    // '--incognito',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--window-size=375,667'
                ]
            });
            this.logger.info('Browser initialized successfully');
            return browser;
        }
        catch (error) {
            this.logger.error('Failed to initialize browser: %s', error);
            throw error;
        }
    }
    async setupGoogleLensPage(browser) {
        this.logger.info('Setting up Google Lens page...');
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36');
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
        try {
            this.logger.debug('Navigating to Google...');
            await page.goto('https://www.google.com');
            this.logger.debug('Navigating to Google Lens...');
            await page.goto('https://lens.google.com/');
            const consentButton = await page.waitForSelector('button[aria-label="Accept all"]', {
                visible: true,
                timeout: 10000
            });
            if (consentButton) {
                this.logger.info('Clicking consent button');
                await consentButton.click();
            }
            else {
                this.logger.warn('Consent button not found');
            }
            this.logger.info('Google Lens page setup complete');
            return page;
        }
        catch (error) {
            this.logger.warn('Consent handling encountered an issue: %s', error);
            return page;
        }
    }
    async scrapeImageDetails(page, imageUrl) {
        try {
            this.logger.info(`Starting scrape for image: ${imageUrl}`);
            await page.goto('https://lens.google.com/');
            this.logger.debug('Waiting for image link input');
            await page.waitForSelector('input[placeholder="Paste image link"]');
            this.logger.debug('Inserting image URL');
            await page.evaluate((url) => {
                const input = document.querySelector('input[placeholder="Paste image link"]');
                if (input)
                    input.value = url;
            }, imageUrl);
            await page.waitForTimeout(2000);
            this.logger.debug('Clicking search button');
            await page.evaluate(() => {
                const searchButton = document.querySelector('.Qwbd3');
                if (searchButton)
                    searchButton.click();
            });
            this.logger.debug('Waiting for search results');
            await page.waitForTimeout(12000);
            this.logger.info('Extracting product details');
            // const results = await page.evaluate(() => {
            //   const divs = document.querySelectorAll('div.G19kAf.ENn9pd');
            //   const cleanPrice = (price: string): string => {
            //     // Remove any unwanted characters
            //     price = price.replace(/[^0-9.,₹€$C£¥]/g, '').trim();
            //     // Identify and format different currencies
            //     if (price.startsWith('₹')) return `₹ ${price.slice(1).trim()} INR`;
            //     if (price.startsWith('€')) return `€ ${price.slice(1).trim()} EUR`;
            //     if (price.startsWith('$')) return `$ ${price.slice(1).trim()} USD`;
            //     if (price.startsWith('C$')) return `C$ ${price.slice(2).trim()} CAD`;
            //     if (price.startsWith('£')) return `£ ${price.slice(1).trim()} GBP`;
            //     if (price.startsWith('¥')) return `¥ ${price.slice(1).trim()} JPY`;
            //     // Default case for any unrecognized currency
            //     return price || 'Price not available';
            //   };
            //   return Array.from(divs).map(div => {
            //     const productNameElement = div.querySelector('.UAiK1e');
            //     const priceElement = div.querySelector('span.DdKZJb');
            //     const reviewsElement = div.querySelector('.YhvNbf');
            //     const stockStatusElement = div.querySelector('.Bc59rd.rR5x2d');
            //     const retailerElement = div.querySelector('.fjbPGe');
            //     const linkElement = div.querySelector('a');
            //     const imageElement: any = div.querySelector('div.Me0cf img.wETe9b.jFVN1');
            //     if (!priceElement) return null;
            //     const productName = productNameElement?.textContent?.trim() || 'Product name not available';
            //     return {
            //       productName: productName,
            //       price: cleanPrice(priceElement?.textContent?.trim() || 'Price not available'),
            //       retailer: retailerElement?.textContent?.trim() || 'Retailer not listed',
            //       numberOfReviews: reviewsElement?.nextSibling?.textContent?.trim().replace(/[()]/g, '') || 'No reviews',
            //       stockStatus: stockStatusElement?.textContent?.trim() || 'Stock status unknown',
            //       brand: productName.split(' ')[0] || 'Brand not specified',
            //       url: linkElement?.href || '#',
            //       imageUrl: imageElement?.src && imageElement.src.includes('http') ? imageElement.src : 'Image not available'
            //     };
            //   }).filter(item => item !== null);
            // }) as ScrapedProduct[];
            const element = await page.$('div[role="list"] > div:nth-of-type(2)');
            if (element) {
                console.log("Element found!");
                // Perform actions with the element, e.g., click
                await Promise.all([
                    element.click(),
                    page.waitForNavigation({ waitUntil: "networkidle0" }), // Wait for navigation to complete
                ]);
                console.log("Navigation completed!");
            }
            else {
                console.log("Element not found");
            }
            await page.waitForTimeout(4000);
            await page.waitForTimeout(4000);
            let results = await page.evaluate(() => {
                const divs = document.querySelectorAll("div.kb0PBd.cvP2Ce");
                return Array.from(divs)
                    .map((div) => {
                    const productNameElement = div.querySelector(".Yt787"); /*span selector*/
                    const priceElement = div.querySelector("span.EwVMFc"); /*span selector*/
                    const reviewsElement = div.querySelector(".z3HNkc.fUNJzc"); /*span selector*/
                    const stockStatusElement = div.querySelector(".h2YlCf");
                    const retailerElement = div.querySelector(/*div selector */ ".R8BTeb.q8U8x.LJEGod.du278d.i0Rdmd");
                    const linkElement = div.querySelector("a");
                    const imageElement = div.querySelector("div.gdOPf.q07dbf.uhHOwf.ez24Df img");
                    if (!priceElement)
                        return null;
                    const productName = productNameElement?.textContent?.trim();
                    const price = priceElement?.textContent?.trim();
                    const retailer = retailerElement?.textContent?.trim();
                    const numberOfReviews = reviewsElement?.nextSibling?.textContent
                        ?.trim()
                        .replace(/[()]/g, "");
                    const stockStatus = stockStatusElement?.textContent?.trim();
                    const brand = productName?.split(" ")[0];
                    const url = linkElement?.href;
                    const imageUrl = imageElement?.src;
                    return {
                        productName,
                        price,
                        retailer,
                        numberOfReviews,
                        stockStatus,
                        brand,
                        url,
                        imageUrl,
                    };
                })
                    .filter((item) => item !== null);
            });
            console.log("Total results found:", results.length);
            await page.waitForTimeout(4000);
            results = results.filter((item, index, self) => item.productName &&
                item.price &&
                item.brand &&
                item.url &&
                self.findIndex((i) => i.url === item.url) === index &&
                self.findIndex((i) => i.brand === item.brand) === index);
            this.logger.info(`Found ${results.length} products for image: ${imageUrl}`);
            return results;
        }
        catch (error) {
            this.logger.error(`Error scraping image details for ${imageUrl}: %s`, error);
            throw error;
        }
    }
    async scrapeProductImages(imageUrls) {
        let allResults = [];
        try {
            this.logger.info(`Starting scraping for ${imageUrls.length} images`);
            this.browser = await this.initializeBrowser();
            const page = await this.setupGoogleLensPage(this.browser);
            for (const imageUrl of imageUrls) {
                try {
                    const results = await this.scrapeImageDetails(page, imageUrl);
                    this.logger.info(`Processed image ${imageUrl}: Found ${results.length} results`);
                    allResults = [...allResults, ...results];
                }
                catch (error) {
                    this.logger.error(`Failed to process image ${imageUrl}: %s`, error);
                }
            }
            this.logger.info(`Scraping completed. Total results: ${allResults.length}`);
        }
        catch (error) {
            this.logger.error('Overall scraping process failed: %s', error);
        }
        finally {
            if (this.browser) {
                this.logger.info('Closing browser');
                await this.browser.close();
            }
        }
        return allResults;
    }
}
async function dooglescrappingfunc(image) {
    const startTime = Date.now();
    const logger = (0, pino_1.default)({
        name: 'scraping-process',
        level: process.env.DEBUG ? 'debug' : 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname'
            }
        }
    });
    const imageUrls = [
        image
    ];
    logger.info('Starting Google Lens scraping process');
    const scraper = new GoogleLensScraper(process.env.PROXY || '');
    try {
        const scrapedProducts = await scraper.scrapeProductImages(imageUrls);
        const endTime = Date.now();
        scrapedProducts.forEach((item) => {
            // console.log(item)
        });
        logger.info(`Scraping completed in ${(endTime - startTime) / 1000} seconds`);
        logger.info(`Total results found: ${scrapedProducts.length}`);
        return {
            sample: scrapedProducts,
            resultCount: scrapedProducts.length,
            completionTime: (endTime - startTime) / 1000
        };
    }
    catch (error) {
        logger.error('Scraping failed:', error);
        return {
            resultCount: 0,
            completionTime: 0
        };
    }
}
//# sourceMappingURL=doogle_scrapper.js.map