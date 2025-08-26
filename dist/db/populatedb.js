"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const zones = __importStar(require("./zones"));
const seasons = __importStar(require("./seasons"));
const instances = __importStar(require("./instances"));
const expansions = __importStar(require("./expansions"));
dotenv_1.default.config();
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
        const client = new pg_1.Client({
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
    }
    catch (error) {
        console.log(`ERROR:\n${error}`);
    }
};
main();
//# sourceMappingURL=populatedb.js.map