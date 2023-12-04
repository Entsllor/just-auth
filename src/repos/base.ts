import {getDb} from "../helpers/get-db";
import {EntityTarget, ObjectLiteral, Repository} from "typeorm";

export abstract class IBaseDbRepo<T extends ObjectLiteral> {
    abstract model: EntityTarget<T>

    get dataSource() {
        return getDb()
    }

    get repo(): Repository<T> {
        return this.dataSource.getRepository(this.model)
    }
}