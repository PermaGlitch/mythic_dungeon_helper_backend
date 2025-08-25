"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 1339;
const HOST = process.env.HOST || "localhost";
const app = express();
app.use(express.static(path.join(__dirname, "..", "assets")));
app.listen(PORT, () => console.log(`Listening to ${HOST}:${PORT}`));
//# sourceMappingURL=app.js.map