// import process from 'node:process';
import { isUndefined } from 'lodash';
import { createConnection, Connection } from 'typeorm';

import 'reflect-metadata';

let databaseInstance: Connection;

export const createDatabase = async (): Promise<Connection> => {
  if (isUndefined(process.env.DATABASE_URL)) {
    throw new Error("Missing env variable 'DATABASE_URL'");
  }

  if (isUndefined(databaseInstance) || databaseInstance.isConnected === false) {
    databaseInstance = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logger: 'advanced-console',
      logging: 'all',
    });

  }
 

  return databaseInstance;
};
