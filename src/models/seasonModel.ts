import db from "../db/pool";

import { IBaseModel } from "./types";
import { LIMIT, OFFSET } from "./constants";

export interface ISerializedSeason extends IBaseModel {
    title: string;
};

const deserializeSeason = (row: ISerializedSeason) => ({
    id: row.id,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

export type Season = ReturnType<typeof deserializeSeason>;

export const getSeasonsList = async (limit = LIMIT, offset = OFFSET) => {
    const { rows } = await db.query(`SELECT * FROM seasons ORDER BY id ASC LIMIT $1 OFFSET $2;`, [limit, offset]);
    return rows.map(deserializeSeason);
};
