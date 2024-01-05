import "./helpers/validation/vine";
import "express-async-errors";
import express, {Express} from "express";
import {appSettings} from "./core/settings";
import chalk from "chalk";
import logger from "morgan";
import cookieParser from "cookie-parser";
import {
    errorHandlerMiddleware,
    requestContextMiddleware,
    transactionErrorHandler,
    transactionMiddlewareBefore,
} from "./middlewares";
import {routers} from "./routers";
import {AppMode} from "./types/settings";

async function onShutDown(err: any) {
    if (err) {
        console.error(err);
    }
}

export function createApp(): [Express, {onShutDown: (err: any) => void}] {
    const app = express();
    // echo env variables
    if (appSettings.MODE !== AppMode.TEST) {
        console.log(
            Object.entries(appSettings)
                .map(([k, v]) => chalk.bold.blue(k) + `=${v}`)
                .join("\n"),
        );
    }

    {
        // middlewares
        app.use(logger(appSettings.LOG_LEVEL));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(requestContextMiddleware); // using AsyncLocalStorage
        app.use(transactionMiddlewareBefore); // using db transactions
    }

    // routers
    routers.forEach(([path, router]) => {
        app.use(path, router);
    });
    {
        // error handlers
        app.use(transactionErrorHandler);
        app.use(errorHandlerMiddleware);
    }
    return [app, {onShutDown}];
}
