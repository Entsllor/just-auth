import vine from "@vinejs/vine";
import {initAppSettings} from "backend-batteries";

export enum AppLogLevel {
    COMBINED = 'combined',
    COMMON = 'common',
    DEV = 'dev',
    SHORT = 'short',
    TINY = 'tiny'
}

export enum AppMode {
    DEV = 'development',
    TEST = 'testing',
    PROD = 'production'
}


const configSchema = vine.object({
    DB_HOST: vine.string(),
    DB_USER: vine.string(),
    DB_NAME: vine.string(),
    LOG_LEVEL: vine.enum(AppLogLevel),
    MODE: vine.enum(AppMode),
    PORT: vine.number()
})

const preparedSettings = initAppSettings(process.env, {prefix: 'APP_'})

const AppSettings = await vine.compile(configSchema).validate(preparedSettings)
export {AppSettings};
