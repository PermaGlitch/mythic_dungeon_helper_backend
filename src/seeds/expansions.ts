import { Client, QueryResult } from "pg";

import { resolvePromisesSequentially } from "../libs/helpPromises";
import { range } from "../libs/helpArrays";

interface IExpansion {
    id: number;
    year: number;
    icon: string;
    title: string;
    seasons: number;
    background: string;
}
export const expansionsSeed: IExpansion[] = [
    { id: 1, title: 'The War Within', year: 2024, icon: 'expansion/tww_icon.png', background: 'expansion/tww_background.jpg', seasons: 3 },
    { id: 2, title: 'Dragonflight', year: 2022, icon: 'expansion/df_icon.webp', background: 'expansion/df_background.jpg', seasons: 4 },
    { id: 3, title: 'Shadowlands', year: 2020, icon: 'expansion/sl_icon.webp', background: 'expansion/sl_background.jpg', seasons: 4 },
];

type IJoinEWithS = (client: Client, expansion: number, season: number) => Promise<QueryResult<any>>;
const joinExpansionWithSeason: IJoinEWithS = (client, expansion, season) =>
    client.query(`INSERT INTO expansion_seasons (expansion_id, season_id) VALUES (${expansion}, ${season})`);

type IExpansionSeasonsArray = (expansions: IExpansion[]) => [number, number][];
const makeExpansionSeasonsArray: IExpansionSeasonsArray = (expansions) =>
    expansions.reduce((acc, e) => [...acc, ...range(1, e.seasons).map(s => [e.id, s] as [number, number])], [] as [number, number][])

type IJoinAllEWithS = (client: Client, expansions: IExpansion[]) => Promise<void>;
export const joinAllExpansionsWithSeasons: IJoinAllEWithS = (client, expansions) =>
    resolvePromisesSequentially(makeExpansionSeasonsArray(expansions).map(es => joinExpansionWithSeason(client, es[0], es[1])));

type IInsertExpansion = (c: Client, d: IExpansion) => Promise<QueryResult<any>>;
export const insertExpansion: IInsertExpansion = (client, expansion) =>
    client.query(`
            INSERT INTO expansions (title, year, icon, background) VALUES ('${expansion.title}', ${expansion.year}, '${expansion.icon}', '${expansion.background}');
        `);

type IInsertExpansions = (client: Client, expansions: IExpansion[]) => Promise<void>;
export const insertExpansions: IInsertExpansions = async (client, expansions) =>
    await resolvePromisesSequentially(expansions.map(e => insertExpansion(client, e)));
