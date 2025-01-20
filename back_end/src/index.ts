import express, { Request, Response } from 'express';
import cors from 'cors';
import { Logger } from 'pino';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { createLogger, getTimestamp } from "./util/logger";
// import { dooglescrappingfunc } from './funtions/doogle_scrapper';
import prisma from './util/create-prisma-client';
import { dooglescrappingfunc } from './funtions/doogle_scrapper';


const port = process.env.PORT;
const debug = process.env.DEBUG;


const app = express();
const server = createServer(app);

const logger: Logger = createLogger({
  name: 'time-taking-tasks',
  level: debug ? 'debug' : 'info',
  timestamp() {
    return getTimestamp();
  },
});

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  res.json({ "status": "active" });
});

app.post("/searchproduct", async (req: Request, res: Response) => {
  const {url} = req.body
  const data = await dooglescrappingfunc(url);
  res.send(data);
});

server.listen(port, async () => {
  logger.info('server is listening on port %d', port);
  // await dooglescrappingfunc('https://m.media-amazon.com/images/I/71ZNbjg56xL._SX500_.jpg');
});
