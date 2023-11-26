import {DataSource} from "typeorm";
import {reqCtx} from "../middlewares";

export function getDb(): DataSource {
    return reqCtx.getStore()?.res.locals.db
}