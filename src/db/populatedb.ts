import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const DROP_TABLES = `
DROP TABLE IF EXISTS expansion_seasons;
DROP TABLE IF EXISTS expansions;
DROP TABLE IF EXISTS seasons;
`;

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS expansions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    description TEXT DEFAULT '',
    icon TEXT,
    background TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO expansions (title, icon, background) VALUES (
    'The War Within',
    'expansion/tww_icon.png',
    'expansion/tww_background.jpg'
);

CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO seasons (title) VALUES ('Season 1'), ('Season 2'), ('Season 3');

CREATE TABLE IF NOT EXISTS expansion_seasons (
    expansion_id INTEGER NOT NULL,
    season_id INTEGER NOT NULL,
    CONSTRAINT fk_expansion FOREIGN KEY (expansion_id) REFERENCES expansions (id),
    CONSTRAINT fk_season FOREIGN KEY (season_id) REFERENCES seasons (id),
    CONSTRAINT unique_expansion_season UNIQUE (expansion_id, season_id)
);

INSERT INTO expansion_seasons (expansion_id, season_id) VALUES (1, 1), (1, 2), (1, 3);
`;

const main = async () => {
    try {
        console.log("Seeding...");
        const client = new Client({
            connectionString: process.env.NODE_ENV === "prod" ? process.env.DB_CONNECTION_PROD : process.env.DB_CONNECTION_DEV,
        });

        await client.connect();
        await client.query(DROP_TABLES);
        await client.query(CREATE_TABLES)
        await client.end();

        console.log("Done!");
    } catch (error) {
        console.log(`ERROR:\n${error}`);
    }
};

main();
