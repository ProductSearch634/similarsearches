import { isNull, isUndefined } from 'lodash';
import { Logger } from 'pino';
import puppeteer, { Browser } from 'puppeteer';

import { to } from './util/to';

type Options = Parameters<typeof puppeteer.connect>[0];

export const connectToBrowserInstance = async (
  opts: Options = {},
  logger?: Logger
): Promise<Browser> => {
  const childLogger = logger?.child({ name: 'connect-to-browser-instance' });

  childLogger?.debug('Connecting to Puppeteer instance');
  const [err, browser] = await to(puppeteer.connect(opts));

  if (!isNull(err)) {
    childLogger?.error(err);
    process.exit(2);
  }

  if (isUndefined(browser)) {
    childLogger?.error('Error: unable to connect with browser instance');
    process.exit(2);
  }
  childLogger?.debug('Connected to Puppeteer instance');

  return browser;
};
