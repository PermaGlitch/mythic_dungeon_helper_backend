import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_DEV,
});

export default {
    query: (sqlString: string, params?: [any]) => pool.query(sqlString, params),
};
