import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./models/user"
import {appSettings} from "./settings";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: appSettings.DB_HOST,
    port: appSettings.PORT,
    username: appSettings.DB_USER,
    password: appSettings.DB_PASSWORD,
    database: appSettings.DB_NAME,
    synchronize: true,
    schema: appSettings.DB_SCHEMA,
    logging: appSettings.DB_LOGGING,
    entities: [User],
    migrations: [],
    subscribers: [],
})
