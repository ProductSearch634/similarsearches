"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: [{ emit: "event", level: "query" }] });
const logQuery = (e) => {
    const query = e.query;
    const params = JSON.stringify(e.params);
    const formattedQuery = chalk_1.default.cyanBright(query);
    const formattedParams = chalk_1.default.greenBright(params);
    console.log(`[Prisma Query]: ${formattedQuery} with params ${formattedParams}`);
};
prisma.$on("query", logQuery);
exports.default = prisma;
//# sourceMappingURL=create-prisma-client.js.map