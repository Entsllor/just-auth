import zod from "zod";

export enum AppMode {
    development = "development",
    production = "production",
    test = "test",
}

enum AvailableAlgorithm {
    RS256 = "RS256",
    RS384 = "RS384",
    RS512 = "RS512",
    HS256 = "HS256",
    HS384 = "HS384",
    HS512 = "HS512"
}


export const configSchema = zod.object({
    NODE_ENV: zod.nativeEnum(AppMode),
    BACKEND_PORT: zod.coerce.number().default(3000),
    APP_VERSION: zod.string().default("1.0"),
    APP_NAME: zod.string().default("nestjs app"),
    SWAGGER_URL_PREFIX: zod.string().regex(/^[\/0-9a-zA-Z\-_]+$/).default("swagger"),

    DB_TYPE: zod.string().default("postgres"),
    DB_NAME: zod.string(),
    DB_HOST: zod.string(),
    DB_PORT: zod.coerce.number(),
    DB_USER: zod.string(),
    DB_PASSWORD: zod.string(),
    DB_LOGGING: zod.coerce.boolean().default(false),

    PASSWORD_SALT_OR_ROUNDS: zod.coerce.number().default(12),

    REDIS_PORT: zod.coerce.number(),
    REDIS_HOST: zod.string().default("localhost"),
    REDIS_DB: zod.coerce.number().default(5),

    JWT_ALGORITHM: zod.nativeEnum(AvailableAlgorithm).default(AvailableAlgorithm.HS256),
    JWT_LIFETIME_IN_MINUTES: zod.coerce.number().default(15),
    REFRESH_TOKEN_LIFETIME_IN_MINUTES: zod.coerce.number().default(15),
});


export type ISettings = zod.output<typeof configSchema>
