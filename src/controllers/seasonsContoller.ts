import db from "../db/pool";

export const getSeasons = async () => await db.query(`
        SELECT * FROM seasons;
    `);
