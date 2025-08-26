import { Client, QueryResult } from "pg";
import { resolvePromisesSequentially } from "../libs/helpPromises";

interface IZone {
    id: number;
    title: string;
}
export const zonesSeed: IZone[] = [
    { id: 1, title: 'Isle of Dorn' },
    { id: 2, title: 'The Ringing Deeps' },
    { id: 3, title: 'Hallowfall' },
    { id: 4, title: 'Azj-Kahet' },
    { id: 5, title: "K''aresh" },
    { id: 6, title: 'The Waking Shores' },
    { id: 7, title: "Ohn''ahran Plains" },
    { id: 8, title: 'Azure Span' },
    { id: 9, title: 'Thaldraszus' },
    { id: 11, title: 'The Forbidden Reach' },
    { id: 12, title: 'Zaralek Cavern' },
    { id: 13, title: 'The Emerald Dream' },
    { id: 14, title: 'Ardenweald' },
    { id: 15, title: 'Bastion' },
    { id: 16, title: 'Maldraxxus' },
    { id: 17, title: 'The Maw' },
    { id: 18, title: 'Revendeth' },
    { id: 19, title: 'Oribos' },
    { id: 20, title: 'Zereth Mortis' },
    { id: 21, title: 'Korthia' },
    { id: 22, title: "Exile''s Reach" },
];

type IInsertZone = (client: Client, zone: IZone) => Promise<QueryResult<any>>;
export const insertZone: IInsertZone = (client, zone) => client.query(`INSERT INTO zones (title) VALUES ('${zone.title}')`);

type IInsertZones = (client: Client, zones: IZone[]) => Promise<void>;
export const insertZones: IInsertZones = (client, zones) => resolvePromisesSequentially(zones.map(z => insertZone(client, z)))
