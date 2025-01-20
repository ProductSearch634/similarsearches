import process from 'process';
import { isNull, isUndefined } from 'lodash';
import { Logger } from 'pino';
import puppeteer, { Browser } from 'puppeteer';

import { to } from './to';

type Options = Parameters<typeof puppeteer.launch>[0];

export const createPuppeteerInstance = async (
    opts: Options = {},
    logger?: Logger
): Promise<Browser> => {
    const childLogger = logger?.child({ name: 'create-puppeteer-instance' });
    childLogger?.debug('Creating Puppeteer instance');
    const [err, browser] = await to(puppeteer.launch(opts));

    if (!isNull(err)) {
        childLogger?.error(err);
        process.exit(1);
    }

    if (isUndefined(browser)) {
        childLogger?.error('Browser instance not exist');
        process.exit(1);
    }

    childLogger?.debug('Created Puppeteer instance');

    return browser;
};
