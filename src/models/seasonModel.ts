import db from "../db/pool";

import { IBaseModel } from "./lib/types";
import { LIMIT, OFFSET } from "./lib/constants";
import { rowsToCamel } from "./lib/caseTransform";

export interface ISerializedSeason extends IBaseModel {
    title: string;
};

export interface Season extends Omit<ISerializedSeason, "created_at" | "updated_at"> {
    createdAt: ISerializedSeason["created_at"];
    updatedAt: ISerializedSeason["updated_at"];
}

export const getSeasonsList = async (limit = LIMIT, offset = OFFSET) => {
    const { rows } = await db.query(`SELECT * FROM seasons ORDER BY id ASC LIMIT $1 OFFSET $2;`, [limit, offset]);
    return rowsToCamel(rows) as unknown as Season[];
};
