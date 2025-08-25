import path from "path";
import dotenv from "dotenv";
import express from "express";

import seasonsRouter from "./routers/seasonsRouter";
import expansionsRouter from "./routers/expansionsRouter";

dotenv.config();

const PORT = process.env.PORT || 1339;
const HOST = process.env.HOST || "localhost";
const ROUTE_PREFIX = "/api";

const app = express();

app.use(ROUTE_PREFIX, express.static(path.join(__dirname, "..", "assets")));

app.use(`${ROUTE_PREFIX}/seasons`, seasonsRouter);
app.use(`${ROUTE_PREFIX}/expansions`, expansionsRouter);

app.listen(PORT, () => console.log(`Listening to ${HOST}:${PORT}`));
