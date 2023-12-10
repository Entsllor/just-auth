import "reflect-metadata"
import {DataSource} from "typeorm"
import {appSettings} from "./settings";
import {AppMode} from "./types/settings";

export const db = new DataSource({
    type: 'postgres',
    host: appSettings.DB_HOST,
    port: appSettings.DB_PORT,
    username: appSettings.DB_USER,
    password: appSettings.DB_PASSWORD,
    database: appSettings.DB_NAME,
    synchronize: appSettings.MODE === AppMode.DEV,
    schema: appSettings.DB_SCHEMA,
    logging: appSettings.DB_LOGGING,
    entities: ['src/models/*.ts'],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
    useUTC: true,
})

db.initialize().catch(() => {
    throw new Error('Cannot connect to DB')
})
