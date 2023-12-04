import vine from "@vinejs/vine";
import {initAppSettings} from "backend-batteries";
import {AppLogLevel, AppMode} from "./types/settings";
import {withDefault} from "./helpers/validation";


const configSchema = vine.object({
    DB_NAME: vine.string(),
    DB_HOST: vine.string(),
    DB_PORT: vine.number(),
    DB_USER: vine.string(),
    DB_PASSWORD: vine.string(),
    DB_LOGGING: withDefault(vine.boolean(), false),
    DB_SCHEMA: withDefault(vine.string(), 'just_auth'),
    LOG_LEVEL: withDefault(vine.enum(AppLogLevel), AppLogLevel.DEV),
    MODE: vine.enum(AppMode),
    PORT: vine.number(),

    JWT_SECRET_KEY: vine.string(),
    ACCESS_TOKEN_LIFETIME_IN_MINUTES: withDefault(vine.number(), 15),
    REFRESH_TOKEN_LIFETIME_IN_MINUTES: withDefault(vine.number(), 60 * 24 * 15),
})

export const appSettings = await vine.compile(configSchema).validate(initAppSettings(process.env, {prefix: 'APP_'}))
