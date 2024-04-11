import {AppMode, ISettings} from "../settings/settings.schemas";
import {DataSourceOptions} from "typeorm";
import {User} from "../../auth/users/users.entity";
import {RefreshToken} from "../../auth/refresh-tokens/refresh-tokens.enity";

export function getDbSettings(envVars: ISettings): DataSourceOptions {
    return {
        type: envVars.DB_TYPE as any,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        database: envVars.DB_NAME,
        logging: envVars.NODE_ENV === AppMode.development,
        entities: [User, RefreshToken],
        migrations: ["migrations/*.{js,ts}"],
        subscribers: [],
        useUTC: true,
        synchronize: envVars.NODE_ENV === AppMode.test,
        dropSchema: envVars.NODE_ENV === AppMode.test,
    };
}
