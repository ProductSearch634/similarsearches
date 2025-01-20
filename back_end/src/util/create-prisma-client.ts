import chalk from "chalk";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: [{ emit: "event", level: "query" }] });

const logQuery = (e: any) => {
    const query = e.query;
    const params = JSON.stringify(e.params);
    const formattedQuery = chalk.cyanBright(query);
    const formattedParams = chalk.greenBright(params);
    console.log(`[Prisma Query]: ${formattedQuery} with params ${formattedParams}`);
};

prisma.$on("query", logQuery);
export default prisma;