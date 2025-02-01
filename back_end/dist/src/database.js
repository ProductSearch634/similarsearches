"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
// import process from 'node:process';
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
require("reflect-metadata");
let databaseInstance;
const createDatabase = async () => {
    if ((0, lodash_1.isUndefined)(process.env.DATABASE_URL)) {
        throw new Error("Missing env variable 'DATABASE_URL'");
    }
    if ((0, lodash_1.isUndefined)(databaseInstance) || databaseInstance.isConnected === false) {
        databaseInstance = await (0, typeorm_1.createConnection)({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            logger: 'advanced-console',
            logging: 'all',
        });
    }
    return databaseInstance;
};
exports.createDatabase = createDatabase;
//# sourceMappingURL=database.js.map