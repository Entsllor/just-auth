import vine from "@vinejs/vine";
import {initAppSettings} from "backend-batteries";
import {AppLogLevel, AppMode} from "./types/settings";
import {withDefault} from "./helpers/parsers";


const configSchema = vine.object({
    DB_HOST: vine.string(),
    DB_USER: vine.string(),
    DB_PASSWORD: vine.string(),
    DB_LOGGING: withDefault(vine.boolean(), false),
    DB_SCHEMA: withDefault(vine.string(), 'just-auth'),
    DB_NAME: vine.string(),
    LOG_LEVEL: withDefault(vine.enum(AppLogLevel), AppLogLevel.DEV),
    MODE: vine.enum(AppMode),
    PORT: vine.number(),
})

export const appSettings = await vine.compile(configSchema).validate(initAppSettings(process.env, {prefix: 'APP_'}))
