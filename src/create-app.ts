import "./helpers/validation/vine";
import "express-async-errors";
import express, {Express} from "express";
import {appSettings} from "./core/settings";
import chalk from "chalk";
import logger from "morgan";
import cookieParser from "cookie-parser";
import {errorHandlerMiddleware, requestContextMiddleware} from "./helpers/middlewares";
import {routers} from "./routers";
import {AppMode} from "./types/settings";
import {raise} from "backend-batteries";
import {InvalidPath} from "./helpers/exceptions";

export function createApp(): Express {
    const app = express();
    // echo env variables
    if (appSettings.MODE !== AppMode.TEST) {
        console.log(
            Object.entries(appSettings)
                .map(([k, v]) => chalk.bold.blue(k) + `=${v}`)
                .join("\n")
        );
    }

    {
        // middlewares
        app.use(logger(appSettings.LOG_LEVEL));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(requestContextMiddleware); // using AsyncLocalStorage
    }

    // routers
    routers.forEach(([path, router]) => {
        app.use(path, router);
    });
    app.all("/*", () => raise(InvalidPath)); // 404 error if invalid path

    // error handlers
    app.use(errorHandlerMiddleware);

    return app;
}
