import "./helpers/validation/vine";
import 'express-async-errors';
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {routers} from "./routers";
import {
    errorHandlerMiddleware,
    requestContextMiddleware,
    transactionErrorHandler,
    transactionMiddlewareBefore
} from "./middlewares";
import {appSettings} from "./settings";
import chalk from "chalk";

export const app = express();


// echo env variables
console.log(Object.entries(appSettings).map(([k, v]) => chalk.bold.blue(k) + `=${v}`).join('\n'))

{
    // middlewares
    app.use(logger(appSettings.LOG_LEVEL));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(requestContextMiddleware) // using AsyncLocalStorage
    app.use(transactionMiddlewareBefore) // using db transactions
}

// routers
routers.forEach(([path, router]) => {
    app.use(path, router);
})

{
    // error handlers
    app.use(transactionErrorHandler)
    app.use(errorHandlerMiddleware)
}

app.listen(appSettings.PORT)
