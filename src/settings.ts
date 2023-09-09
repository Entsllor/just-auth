import vine from "@vinejs/vine";
import {initAppSettings} from "backend-batteries";
import {AppLogLevel, AppMode} from "./types/settings";


const configSchema = vine.object({
    DB_HOST: vine.string(),
    DB_USER: vine.string(),
    DB_NAME: vine.string(),
    LOG_LEVEL: vine.enum(AppLogLevel),
    MODE: vine.enum(AppMode),
    PORT: vine.number()
})

export const AppSettings = await vine.compile(configSchema).validate(initAppSettings(process.env, {prefix: 'APP_'}))
