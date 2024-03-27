import vine, {errors} from "@vinejs/vine";
import {initAppSettings} from "backend-batteries";
import {AppLogLevel, AppMode} from "../types/settings";
import {withDefault} from "../helpers/validation";
import {Algorithm} from "jsonwebtoken";
import {Infer} from "@vinejs/vine/build/src/types";
import path from "node:path";

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

    JWT_PUBLIC_SECRET_KEY: withDefault(vine.string(), ""),
    JWT_PRIVATE_SECRET_KEY: vine.string(),
    JWT_ALGORITHM: withDefault(
        vine.enum(["HS256", "HS384", "HS512", "RS256", "RS384", "RS512"] satisfies Algorithm[]),
        "HS256"
    ),
    ACCESS_TOKEN_LIFETIME_IN_MINUTES: withDefault(vine.number(), 15),
    REFRESH_TOKEN_LIFETIME_IN_MINUTES: withDefault(vine.number(), 60 * 24 * 15),
});
type ConfigSchema = Infer<typeof configSchema>;

async function handleRsaKeys(settings: ConfigSchema): Promise<ConfigSchema> {
    const keysPath = path.join(import.meta.dir, "..", "..", "keys", 'auth');
    const pubKeyPath = path.join(keysPath, "jwt.key.pub");
    const privateKeyPath = path.join(keysPath, "jwt.key");

    const publicKey = (await Bun.file(pubKeyPath).exists()) ? await Bun.file(pubKeyPath).text() : undefined;
    if (!publicKey) {
        throw new Error(`Cannot find public key in ${pubKeyPath}. Create public key, or set APP_JWT_ALGORITHM=HS256`);
    }
    const privateKey = (await Bun.file(privateKeyPath).exists()) ? await Bun.file(privateKeyPath).text() : undefined;
    if (!privateKey) {
        throw new Error(
            `Cannot find private key in ${privateKeyPath}. Create public key, or set APP_JWT_ALGORITHM=HS256`
        );
    }
    settings.JWT_PUBLIC_SECRET_KEY = publicKey
    settings.JWT_PRIVATE_SECRET_KEY = privateKey;
    return settings;
}

async function initSettings() {
    let settings: ConfigSchema;
    try {
        settings = await vine
            .compile(configSchema)
            .validate(initAppSettings({...process.env, APP_MODE: process.env.NODE_ENV}, {prefix: "APP_"}));
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            // array created by SimpleErrorReporter
            console.log(error.messages);
        }
        throw new Error("Invalid settings");
    }

    if (import.meta.dir && ["RS256", "RS384", "RS512"].includes(settings.JWT_ALGORITHM) && !settings.JWT_PUBLIC_SECRET_KEY) {
        settings = await handleRsaKeys(settings);
    } else {
        settings.JWT_PUBLIC_SECRET_KEY = settings.JWT_PRIVATE_SECRET_KEY;
    }
    return settings;
}

export const appSettings = await initSettings();
