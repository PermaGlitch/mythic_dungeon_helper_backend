import db from "../db/pool";

export const getSeasonsList = async () => (await db.query(`SELECT * FROM seasons;`)).rows;
