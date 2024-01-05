import {DataSource} from "typeorm";
import {reqCtx} from "../middlewares";


import {db} from "../core/data-source";

export function getDb(): DataSource {
    if (!reqCtx.getStore()) {
        return db;
    }
    return reqCtx.getStore()?.res.locals.db;
}
