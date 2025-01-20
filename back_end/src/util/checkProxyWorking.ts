import { isNull } from 'lodash';
import { connectToBrowserInstance } from '../connect-to-browser-instance';
import { to } from './to';

export const checkProxyWorking = async (ws: string) => {
  const browser = await connectToBrowserInstance({
    browserWSEndpoint: ws,
    defaultViewport: { isMobile: true, width: 900, height: 1280 },
  });
  const [createPageErr, page] = await to(browser.newPage());

  if (!isNull(createPageErr)) {
    throw 'error while creating page';
  }

  await page.close()

};
