import * as dotenv from "dotenv";
dotenv.config();

export const APP_CONFIG = {
    appPort: process.env.PORT ? +process.env.PORT : 5000,
    logLevel: process.env.LOG_LEVEL || "info",
    logDriver: process.env.LOG_DRIVER || "console",
} as const;

export const CORS_CONFIG = {
    origin: process.env.ORIGIN || "*",
    credential: Boolean(process.env.CREDENTIAL).valueOf() || false,
} as const;

export const DATABASE_CONFIG = {
    url: process.env.DB_URL || "",
} as const;
