import db from "../db/pool";

export const getExpansionsList = async () => (await db.query(`SELECT * FROM expansions;`)).rows;
