import { Client, QueryResult } from "pg";

import { resolvePromisesSequentially } from "../libs/helpPromises";

export interface ISeason {
    id: number;
    title: string;
}
export const seasonsSeed: ISeason[] = [{ id: 1, title: 'Season 1' }, { id: 2, title: 'Season 2' }, { id: 3, title: 'Season 3' }, { id: 4, title: 'Season 4' }];

type IInsertSeason = (client: Client, season: ISeason) => Promise<QueryResult<any>>;
export const insertSeason: IInsertSeason = async (client, season) => await client.query(`INSERT INTO seasons (title) VALUES ('${season.title}')`);

type IInsertSeasons = (client: Client, seasons: ISeason[]) => Promise<void>;
export const insertSeasons: IInsertSeasons = async (client, seasons) =>
    await resolvePromisesSequentially(seasons.map(s => insertSeason(client, s)));
