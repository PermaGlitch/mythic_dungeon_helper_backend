import db from "../db/pool";

import { IBaseModel } from "./types";
import { LIMIT, OFFSET } from "./constants";

export interface ISerializedExpansion extends IBaseModel {
    year: number;
    icon: string;
    title: string;
    background: string;
    description: string;
}

const deserializeExpansions = (row: ISerializedExpansion) => ({
    id: row.id,
    year: row.year,
    icon: row.icon,
    title: row.title,
    background: row.background,
    description: row.description,
    created_at: row.created_at,
    updated_at: row.updated_at,
});

export type Expansion = ReturnType<typeof deserializeExpansions>;

export const getExpansionsList = async (limit = LIMIT, offset = OFFSET) => {
    const { rows } = await db.query(`SELECT * FROM expansions ORDER BY year DESC LIMIT $1 OFFSET $2;`, [limit, offset]);
    return rows.map(deserializeExpansions);
};
