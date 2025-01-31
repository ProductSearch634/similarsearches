import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { createLogger, getTimestamp } from './util/logger';
// import { dooglescrappingfunc } from './funtions/doogle_scrapper';
import prisma from './util/create-prisma-client';
import { dooglescrappingfunc } from './funtions/doogle_scrapper';
import mongoose from 'mongoose';
import rateLimiter from '../rateLimiter'; // Correct relative path

const port = process.env.PORT;
const debug = process.env.DEBUG;
const dbUri = process.env.DB_URI || ''; // MongoDB URI

const app = express();

const logger = createLogger({
  name: 'products',
  level: debug ? 'debug' : 'info',
  timestamp() {
    return getTimestamp();
  },
});

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(dbUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

app.get('/', async (req: Request, res: Response) => {
  res.json({ status: 'active' });
});

// Apply rate limiter middleware to the route
app.post('/searchproduct', rateLimiter, async (req: Request, res: Response) => {
  const { url } = req.body;
  const data = await dooglescrappingfunc(url);
  res.send(data);
});

app.listen(port, () => {
  logger.info('server is listening on port %d', port);
});
