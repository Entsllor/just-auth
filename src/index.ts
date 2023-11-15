import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {routers} from "./routers";
import {ErrorHandlerMiddleware} from "./middlewares/error-handler-middleware";
import {AppSettings} from "./settings";
import chalk from "chalk";

export const app = express();
console.log(Object.entries(AppSettings).map(([k, v]) => chalk.bold.blue(k) + `=${v}`).join('\n'))
app.use(logger(AppSettings.LOG_LEVEL));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

routers.forEach(([path, router]) => {
    app.use(path, router);
})

app.use(ErrorHandlerMiddleware)

app.listen(AppSettings.PORT)
