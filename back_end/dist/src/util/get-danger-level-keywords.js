"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDangerLevelKeywords = getDangerLevelKeywords;
const database_1 = require("../database");
async function getDangerLevelKeywords() {
    const db = await (0, database_1.createDatabase)();
    try {
        const queryRunner = db.createQueryRunner();
        const risk_level_details = await queryRunner.query('SELECT * from risk_level_details order by level asc');
        await queryRunner.release();
        return risk_level_details;
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=get-danger-level-keywords.js.map