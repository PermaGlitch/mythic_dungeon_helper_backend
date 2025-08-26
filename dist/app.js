"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const seasonsRouter_1 = __importDefault(require("./routers/seasonsRouter"));
const expansionsRouter_1 = __importDefault(require("./routers/expansionsRouter"));
dotenv_1.default.config();
const PORT = process.env.PORT || 1339;
const HOST = process.env.HOST || "localhost";
const ROUTE_PREFIX = "/api";
const app = (0, express_1.default)();
app.use(ROUTE_PREFIX, express_1.default.static(path_1.default.join(__dirname, "..", "assets")));
app.use(`${ROUTE_PREFIX}/seasons`, seasonsRouter_1.default);
app.use(`${ROUTE_PREFIX}/expansions`, expansionsRouter_1.default);
app.listen(PORT, () => console.log(`Listening to ${HOST}:${PORT}`));
//# sourceMappingURL=app.js.map