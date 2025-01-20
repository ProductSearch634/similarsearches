// const proxyChain = require("proxy-chain");
// import { createLogger, getTimestamp } from "../util/logger";
// import { isEqual, isNull, isUndefined, result } from "lodash";
// import puppeteer, { Browser, Page } from "puppeteer";
// import { createPuppeteerInstance } from "../util/create-pupeeteer-instance";
// import { to } from "../util/to";
// import { Logger } from "pino";
// import prisma from "../util/create-prisma-client";
// import { checkProxyWorking } from "../util/checkProxyWorking";
// require("dotenv").config();

// let MODE = process.env.MODE;
// let offset = process.env.OFFSET;
// let categoryName = process.env.CATEGORY;
// let trackprocessType = process.env.TRACKTYPE;
// const debug = process.env.DEBUG;
// const proxy: any = process.env.PROXY;

// const logger: Logger = createLogger({
//   name: "time-taking-tasks",
//   level: debug ? "debug" : "info",
//   timestamp() {
//     return getTimestamp();
//   },
// });

// let firstImagesUrls: any = [];
// const getImageUrls = async () => {
//   try {
//     // Fetching the most recent 10,000 products
//     const products = await prisma.product_details.findMany({
//       where: { category: "dieren" },
//       select: {
//         image: true,
//         id: true,
//       },
//     });

//     console.log(`Fetched ${products.length} products successfully.`);

//     // Map to an array of objects with id and first image URL
//     const imagesWithIds = products
//       .map((product) => {
//         const firstImageUrl = product.image
//           ? product.image.split(",")[0]
//           : null;
//         return {
//           id: product.id,
//           imageUrl: firstImageUrl,
//         };
//       })
//       .filter((item) => item.imageUrl !== null); // Filter out items without an image URL

//     return imagesWithIds; // Return the array of objects
//   } catch (error: any) {
//     console.error("An error occurred while fetching products:", error.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// export async function dooglescrappingfunc() {
//   let imageUrls: any = await getImageUrls();
//   console.log(imageUrls[0].imageUrl);
//   let page: Page | null = null;

//   try {
//     console.log("Starting dooglescrappingfunc...");

//     const newProxyUrl = await proxyChain.anonymizeProxy(proxy);
//     console.log("Proxy anonymized successfully.");

//     const [createBrowserErr, browser] = await to(
//       puppeteer.launch({
//         handleSIGHUP: true,
//         handleSIGINT: true,
//         headless: false,
//         handleSIGTERM: true,
//         defaultViewport: { height: 720, width: 1280 },
//         slowMo: 3000,
//         // args: [`--proxy-server=${newProxyUrl}`, '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
//       })
//     );

//     if (!browser) {
//       throw new Error("Failed to create browser instance");
//     }
//     console.log("Browser instance created successfully.");

//     const [proxyErr, working] = await to(
//       checkProxyWorking(browser.wsEndpoint())
//     );
//     if (!isNull(proxyErr)) {
//       throw new Error(`Proxy check failed: ${proxyErr.message}`);
//     }
//     console.log("Proxy check completed successfully.");

//     const connectionOpts = {
//       browserWSEndpoint: browser.wsEndpoint(),
//       defaultViewport: { isMobile: true, width: 900, height: 1280 },
//     };
//     const connectedBrowser = await puppeteer.connect(connectionOpts);
//     console.log("Connected to browser successfully.");

//     page = await connectedBrowser.newPage();
//     console.log("New page created.");

//     await page.goto("https://www.google.com");
//     console.log("Navigated to Google homepage.");

//     await page.goto(
//       "https://consent.google.com/m?continue=https://lens.google.com/&gl=FR&m=0&pc=l&cm=2&hl=en-US&src=1"
//     );
//     console.log("Navigated to Google consent page.");

//     const acceptButton = await page.waitForSelector(
//       'button[aria-label="Accept all"]',
//       { visible: true }
//     );
//     if (acceptButton) {
//       await acceptButton.click();
//       console.log("Clicked 'Accept all' button.");
//     } else {
//       console.log("'Accept all' button not found.");
//     }

//     const maxIterations = imageUrls.length; // Set your desired limit here

//     const trackprocessno = await prisma.trackprocessno.findFirst({
//       where: { type: "google_scrapper", category: "dieren" },
//     });
//     let indexNo = trackprocessno?.index || 0;
//     for (let i = indexNo; i < imageUrls.length; ) {
//       try {
//         console.log(
//           `Processing image ${i + 1} of ${imageUrls.length}: ${
//             imageUrls[i].imageUrl
//           }`
//         );

//         await page.waitForTimeout(4000);
//         await page.goto("https://lens.google.com/");
//         console.log("Navigated to Google Lens.");

//         await page.waitForSelector('input[placeholder="Paste image link"]');
//         console.log("Image link input field found.");

//         // Pass the current image URL to the evaluate function
//         await page.evaluate((imageUrl) => {
//           const input = document.querySelector(
//             'input[placeholder="Paste image link"]'
//           ) as HTMLInputElement;
//           if (input) {
//             input.value = imageUrl; // Use the passed image URL
//             console.log("Image link pasted successfully.");
//           } else {
//             console.log("Image link input not found.");
//           }
//         }, imageUrls[i].imageUrl); // Pass imageUrls[i] as an argument here

//         await page.waitForTimeout(4000);

//         await page.evaluate(() => {
//           const div = document.querySelector(".Qwbd3") as HTMLDivElement;
//           if (div) {
//             div.click();
//             console.log("Search button clicked.");
//           } else {
//             console.log("Search button not found.");
//           }
//         });

//         await page.waitForTimeout(12000); // Wait for results to load

//         const element = await page.$('div[role="list"] > div:nth-of-type(2)');
//         if (element) {
//           console.log("Element found!");
//           // Perform actions with the element, e.g., click
//           await Promise.all([
//             element.click(),
//             page.waitForNavigation({ waitUntil: "networkidle0" }), // Wait for navigation to complete
//           ]);
//           console.log("Navigation completed!");
//         } else {
//           console.log("Element not found");
//         }

//         await page.waitForTimeout(4000);
//         interface ProductItem {
//           productName: string;
//           price: string;
//           retailer: string;
//           numberOfReviews: string;
//           stockStatus: string;
//           brand: string;
//           url: string;
//           imageUrl: string;
//         }

//         await page.waitForTimeout(4000);
//         let results = await page.evaluate(() => {
//           const divs = document.querySelectorAll("div.kb0PBd.cvP2Ce");

//           return Array.from(divs)
//             .map((div) => {
//               const productNameElement = div.querySelector(".Yt787");    /*span selector*/
//               const priceElement = div.querySelector("span.EwVMFc");     /*span selector*/
//               const reviewsElement = div.querySelector(".z3HNkc.fUNJzc"); /*span selector*/
//               const stockStatusElement = div.querySelector(".h2YlCf");
//               const retailerElement = div.querySelector( /*div selector */
//                 ".R8BTeb.q8U8x.LJEGod.du278d.i0Rdmd"
//               );
//               const linkElement = div.querySelector("a");
//               const imageElement = div.querySelector(
//                 "div.gdOPf.q07dbf.uhHOwf.ez24Df img"
//               );

//               if (!priceElement) return null;

//               const productName = productNameElement?.textContent?.trim();
//               const price = priceElement?.textContent?.trim();
//               const retailer = retailerElement?.textContent?.trim();
//               const numberOfReviews = reviewsElement?.nextSibling?.textContent
//                 ?.trim()
//                 .replace(/[()]/g, "");
//               const stockStatus = stockStatusElement?.textContent?.trim();
//               const brand = productName?.split(" ")[0];
//               const url = (linkElement as HTMLAnchorElement)?.href;
//               const imageUrl = (imageElement as HTMLImageElement)?.src;

//               return {
//                 productName,
//                 price,
//                 retailer,
//                 numberOfReviews,
//                 stockStatus,
//                 brand,
//                 url,
//                 imageUrl,
//               };
//             })
//             .filter((item): item is ProductItem => item !== null);
//         });

//         console.log("Total results found:", results.length);

//         await page.waitForTimeout(4000);

//         results = results.filter(
//           (item: ProductItem, index: number, self: ProductItem[]) =>
//             item.productName &&
//             item.price &&
//             item.brand &&
//             item.url &&
//             self.findIndex((i) => i.url === item.url) === index &&
//             self.findIndex((i) => i.brand === item.brand) === index
//         );

//         console.log({ "fileted counts": results.length });
//         console.log("------Transaction------");

//         await page.waitForTimeout(4000);
//         try {
//           await prisma.$transaction(async (tx) => {
//             const productId = imageUrls[i].id;
//             if (!productId) {
//               throw new Error("Product ID is undefined");
//             }

//             const existingRecords = await tx.doogle_products_details.findMany({
//               where: {
//                 product_id: productId,
//               },
//             });

//             if (results.length > existingRecords.length) {
//               // Delete existing records
//               await tx.doogle_products_details.deleteMany({
//                 where: {
//                   product_id: productId,
//                 },
//               });

//               // Create new records
//               const createPromises = results.map((item) => {
//                 const {
//                   productName = "",
//                   price = "",
//                   retailer = "",
//                   numberOfReviews = "",
//                   stockStatus = "",
//                   brand = "",
//                   url = "",
//                   imageUrl = "",
//                 } = item;

//                 return tx.doogle_products_details.create({
//                   data: {
//                     product_id: productId,
//                     product_name: productName.substring(0, 255),
//                     price: price.substring(0, 50),
//                     retailer: retailer.substring(0, 100),
//                     number_of_reviews: numberOfReviews.substring(0, 50),
//                     stock_status: stockStatus.substring(0, 50),
//                     brand: brand.substring(0, 100),
//                     url: url.length > 200 ? url.substring(0, 200) : url,
//                     image_url: imageUrl.substring(0, 255),
//                   },
//                 });
//               });

//               await Promise.all(createPromises);
//             } else {
//               // Update or create records as needed
//               for (const item of results) {
//                 const existingRecord = existingRecords.find(
//                   (record) =>
//                     record.retailer === item.retailer &&
//                     record.brand === item.brand
//                 );

//                 const {
//                   productName = "",
//                   price = "",
//                   retailer = "",
//                   numberOfReviews = "",
//                   stockStatus = "",
//                   brand = "",
//                   url = "",
//                   imageUrl = "",
//                 } = item;

//                 if (!existingRecord) {
//                   await tx.doogle_products_details.create({
//                     data: {
//                       product_id: productId,
//                       product_name: productName.substring(0, 255),
//                       price: price.substring(0, 50),
//                       retailer: retailer.substring(0, 100),
//                       number_of_reviews: numberOfReviews.substring(0, 50),
//                       stock_status: stockStatus.substring(0, 50),
//                       brand: brand.substring(0, 100),
//                       url: url.length > 200 ? url.substring(0, 200) : url,
//                       image_url: imageUrl.substring(0, 255),
//                     },
//                   });
//                 } else {
//                   await tx.doogle_products_details.updateMany({
//                     where: {
//                       product_id: productId,
//                       retailer: item.retailer,
//                       brand: item.brand,
//                       url: item.url,
//                     },
//                     data: {
//                       product_name: productName.substring(0, 255),
//                       price: price.substring(0, 50),
//                       retailer: retailer.substring(0, 100),
//                       number_of_reviews: numberOfReviews.substring(0, 50),
//                       stock_status: stockStatus.substring(0, 50),
//                       brand: brand.substring(0, 100),
//                       url: url.length > 200 ? url.substring(0, 200) : url,
//                       image_url: imageUrl.substring(0, 255),
//                     },
//                   });
//                 }
//               }
//             }
//           });
//         } catch (error: any) {
//           if (error.code === "P2002") {
//             console.error("Unique constraint failed:", error.meta.target);
//             // Handle the unique constraint error
//           } else {
//             console.error("Transaction failed:", error);
//             throw error; // Re-throw the error to be handled by the calling function
//           }
//         }

//         await page.waitForTimeout(2000);
//         await updateTrackprocessno(i);
//         i++;

//         if (i >= maxIterations) {
//           console.log("Reached the maximum iteration limit. Resetting index.");
//           i = 0;
//         }
//       } catch (error) {
//         console.error(`Error occurred at index ${i}:`, error);
//         console.log(`Waiting for 2 minutes before retrying...`);
//         await new Promise((resolve) => setTimeout(resolve, 120000)); // Wait for 2 minutes
//         console.log(`Retrying index ${i}...`);
//         // Note: We don't increment i here, so it will retry the same index
//       }
//     }
//   } catch (err: any) {
//     logger?.error("Error during page interaction: %s", err.message);
//     console.error("An error occurred:", err.message);
//   }
// }

// async function updateTrackprocessno(i: any) {
//   await prisma.trackprocessno.updateMany({
//     where: { type: `google_scrapper`, category: `dieren` },
//     data: {
//       index: i + 1,
//     },
//   });
// }
