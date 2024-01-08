import vine, {errors} from "@vinejs/vine";
import {initAppSettings} from "backend-batteries";
import {AppLogLevel, AppMode} from "../types/settings";
import {withDefault} from "../helpers/validation";

const configSchema = vine.object({
    DB_NAME: vine.string(),
    DB_HOST: vine.string(),
    DB_PORT: vine.number(),
    DB_USER: vine.string(),
    DB_PASSWORD: vine.string(),
    DB_LOGGING: withDefault(vine.boolean(), false),
    LOG_LEVEL: withDefault(vine.enum(AppLogLevel), AppLogLevel.DEV),
    MODE: vine.enum(AppMode),
    PORT: vine.number(),

    JWT_SECRET_KEY: vine.string(),
    ACCESS_TOKEN_LIFETIME_IN_MINUTES: withDefault(vine.number(), 15),
    REFRESH_TOKEN_LIFETIME_IN_MINUTES: withDefault(vine.number(), 60 * 24 * 15),
});

async function initSettings() {
    try {
        return await vine
            .compile(configSchema)
            .validate(initAppSettings({...process.env, APP_MODE: process.env.NODE_ENV}, {prefix: "APP_"}));
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            // array created by SimpleErrorReporter
            console.log(error.messages);
        }
        throw new Error("Invalid settings");
    }
}

export const appSettings = await initSettings();
