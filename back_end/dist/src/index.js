"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const logger_1 = require("./util/logger");
const doogle_scrapper_1 = require("./funtions/doogle_scrapper");
const mongoose_1 = __importDefault(require("mongoose"));
const rateLimiter_1 = __importDefault(require("../rateLimiter")); // Correct relative path
const port = process.env.PORT;
const debug = process.env.DEBUG;
const dbUri = process.env.DB_URI || ''; // MongoDB URI
const app = (0, express_1.default)();
const logger = (0, logger_1.createLogger)({
    name: 'products',
    level: debug ? 'debug' : 'info',
    timestamp() {
        return (0, logger_1.getTimestamp)();
    },
});
app.use((0, cors_1.default)({ origin: '*' }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose_1.default.connect(dbUri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});
app.get('/', async (req, res) => {
    res.json({ status: 'active' });
});
// Apply rate limiter middleware to the route
app.post('/searchproduct', rateLimiter_1.default, async (req, res) => {
    const { url } = req.body;
    const data = await (0, doogle_scrapper_1.dooglescrappingfunc)(url);
    res.send(data);
});
app.listen(port, () => {
    logger.info('server is listening on port %d', port);
});
//# sourceMappingURL=index.js.map