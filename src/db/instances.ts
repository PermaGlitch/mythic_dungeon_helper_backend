import { Client, QueryResult } from "pg";

import { resolvePromisesSequentially } from "../libs/helpPromises";

interface IInstance {
    icon: string;
    title: string;
    zone_id: number;
    latitude: number;
    longitude: number;
    background: string;
    expansion_id: number;
}
export const instancesSeed: IInstance[] = [
    { title: 'Ara-Kara, City of Echoes', expansion_id: 1, zone_id: 4, icon: 'expansion/tww_icon.png', background: 'instances/ara_kara_background.jpg', latitude: 51.2, longitude: 45.7 },
    { title: 'The Dawnbreaker', expansion_id: 1, zone_id: 3, icon: 'expansion/tww_icon.png', background: 'instances/the_dawnbreaker_background.jpg', latitude: 54.7, longitude: 62.9 },
    { title: "Eco-Dome Al''dani", expansion_id: 1, zone_id: 5, icon: 'expansion/tww_icon.png', background: 'instances/eco_dome_background.jpg', latitude: 43.4, longitude: 7.6 },
    { title: 'Halls of Atonement', expansion_id: 3, zone_id: 17, icon: 'expansion/sl_icon.webp', background: 'instances/halls_of_atonement_background.jpg', latitude: 78.2, longitude: 48.6 },
    { title: 'Operation: Floodgate', expansion_id: 1, zone_id: 2, icon: 'expansion/tww_icon.png', background: 'instances/operation_floodgate_background.jpg', latitude: 42.2, longitude: 39.6 },
    { title: 'Priory of the Sacred Flame', expansion_id: 1, zone_id: 3, icon: 'expansion/tww_icon.png', background: 'instances/priory_background.jpg', latitude: 42.0, longitude: 50.0 },
    { title: 'Tazavesh: Streets of Wonder', expansion_id: 3, zone_id: 5, icon: 'expansion/sl_icon.webp', background: 'instances/tazavesh_background.jpg', latitude: 0.0, longitude: 0.0 },
    { title: "Tazavesh: So''Leah''s Gambit", expansion_id: 3, zone_id: 5, icon: 'expansion/sl_icon.webp', background: 'instances/tazavesh_background.jpg', latitude: 0.0, longitude: 0.0 },
];

type IInsertInstance = (client: Client, instance: IInstance) => Promise<QueryResult<any>>;
export const insertInstance: IInsertInstance = (client, instance) =>
    client.query(`INSERT INTO instances (title, expansion_id, zone_id, icon, background, latitude, longitude) VALUES (
            '${instance.title}', ${instance.expansion_id}, ${instance.zone_id},
            '${instance.icon}', '${instance.background}', ${instance.latitude}, ${instance.longitude}
        );`);

type IInsertInstances = (client: Client, instances: IInstance[]) => Promise<void>;
export const insertInstances: IInsertInstances = (client, instances) => resolvePromisesSequentially(instances.map(i => insertInstance(client, i)));
