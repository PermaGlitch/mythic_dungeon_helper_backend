import db from "../db/pool";

export const getExpansions = async () => await db.query(`
        SELECT * FROM expansions;
    `);
