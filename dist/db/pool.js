"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
module.exports = new Pool({
    connectionString: process.env.DB_CONNECTION,
});
//# sourceMappingURL=pool.js.map