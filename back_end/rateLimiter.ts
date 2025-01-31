// middlewares/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';
import RequestCount, { IRequestCount } from './models/requestCount'; // Correct relative path

const REQUEST_COUNTS = Number(process.env.REQUEST_COUNTS) || 3;

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId || req.ip;

  try {
    let requestCount = await RequestCount.findOne({ userId });

    if (!requestCount) {
      // Create a new document if it doesn't exist
      const newRequestCount = new RequestCount({ userId, count: 1 });
      await newRequestCount.save();
      return next();
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const timeElapsed = now - new Date(requestCount.lastRequest).getTime();

    if (timeElapsed > oneDay) {
      // Reset the count if more than 24 hours have passed
      requestCount.count = 1;
      requestCount.lastRequest = new Date(now);
      await requestCount.save();
      return next();
    }

    if (requestCount.count >= REQUEST_COUNTS) {
      return res.status(429).json({ message: 'You have exceeded the 3 requests in 24 hours limit!' });
    }

    // Increment the count if within the 24-hour window
    requestCount.count += 1;
    requestCount.lastRequest = new Date(now);
    await requestCount.save();
    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimiter;
