import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {routers} from "./routers";
import {ErrorHandlerMiddleware} from "./middlewares/error-handler-middleware";
import {AppMode, AppSettings} from "./settings";

export const app = express();

app.use(logger(AppSettings.LOG_LEVEL));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(ErrorHandlerMiddleware)

routers.forEach(([path, router]) => {
    app.use(path, router);
})

if (AppSettings.MODE === AppMode.DEV) {
    console.log(AppSettings)
}
app.listen(AppSettings.PORT)

