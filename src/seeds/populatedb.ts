import dotenv from "dotenv";
import { Client } from "pg";

import * as zones from "./zones";
import * as seasons from "./seasons";
import * as instances from "./instances";
import * as expansions from "./expansions";

dotenv.config();

const DROP_TABLES = `
DROP TABLE IF EXISTS expansion_seasons;
DROP TABLE IF EXISTS seasons;
DROP TABLE IF EXISTS instances;
DROP TABLE IF EXISTS zones;
DROP TABLE IF EXISTS expansions;
`;

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS expansions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    description TEXT DEFAULT '',
    year INTEGER,
    icon TEXT,
    background TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expansion_seasons (
    expansion_id INTEGER NOT NULL,
    season_id INTEGER NOT NULL,
    CONSTRAINT fk_expansion FOREIGN KEY (expansion_id) REFERENCES expansions (id),
    CONSTRAINT fk_season FOREIGN KEY (season_id) REFERENCES seasons (id),
    CONSTRAINT unique_expansion_season UNIQUE (expansion_id, season_id)
);

CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS instances (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    icon TEXT,
    background TEXT,
    expansion_id INTEGER NOT NULL,
    zone_id INTEGER NOT NULL,
    latitude NUMERIC(4, 1),
    longitude NUMERIC(4, 1),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_expansion FOREIGN KEY (expansion_id) REFERENCES expansions (id),
    CONSTRAINT fk_zone FOREIGN KEY (zone_id) REFERENCES zones (id)
);
`;

const main = async () => {
    try {
        console.log("Seeding...");

        const client = new Client({
            connectionString: process.env.DB_CONNECTION_DEV,
        });

        await client.connect();
        
        await client.query(DROP_TABLES);
        await client.query(CREATE_TABLES);

        await zones.insertZones(client, zones.zonesSeed);
        await seasons.insertSeasons(client, seasons.seasonsSeed);
        await expansions.insertExpansions(client, expansions.expansionsSeed);
        await instances.insertInstances(client, instances.instancesSeed);
        await expansions.joinAllExpansionsWithSeasons(client, expansions.expansionsSeed);

        await client.end();

        console.log("Done!");
    } catch (error) {
        console.log(`ERROR:\n${error}`);
    }
};

main();
