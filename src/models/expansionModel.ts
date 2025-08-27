import db from "../db/pool";

import { IBaseModel } from "./lib/types";
import { LIMIT, OFFSET } from "./lib/constants";
import { rowsToCamel } from "./lib/caseTransform";

export interface ISerializedExpansion extends IBaseModel {
    year: number;
    icon: string;
    title: string;
    background: string;
    description: string;
}

export interface Expansion extends Omit<ISerializedExpansion, "created_at" | "updated_at"> {
    createdAt: ISerializedExpansion["created_at"];
    updatedAt: ISerializedExpansion["updated_at"];
}

export const getExpansionsList = async (limit = LIMIT, offset = OFFSET) => {
    const { rows } = await db.query(`SELECT * FROM expansions ORDER BY year DESC LIMIT $1 OFFSET $2;`, [limit, offset]);
    return rowsToCamel(rows) as unknown as Expansion;
};
