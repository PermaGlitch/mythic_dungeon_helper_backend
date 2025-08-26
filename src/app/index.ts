import path from "path";
import express from "express";

import seasonsRouter from "../routers/seasonsRouter";
import expansionsRouter from "../routers/expansionsRouter";

const ROUTE_PREFIX = "/api";

const app = express();

app.use(ROUTE_PREFIX, express.static(path.join(__dirname, "..", "..", "assets")));

app.use(`${ROUTE_PREFIX}/seasons`, seasonsRouter);
app.use(`${ROUTE_PREFIX}/expansions`, expansionsRouter);

export default app;
