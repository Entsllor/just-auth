import {NextFunction, Request, Response} from "express";
import {db} from "../data-source";
import onFinished from "on-finished";


export async function transactionMiddlewareBefore(request: Request, res: Response, next: NextFunction) {
    const queryRunner = db.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    res.locals['db'] = queryRunner.manager
    onFinished(res, async (err, msg) => {
            if (!err && queryRunner.isTransactionActive) {
                await queryRunner.commitTransaction()
            }
        }
    )
    next()
}

export async function transactionErrorHandler(err: any, request: Request, res: Response, next: NextFunction) {
    if (res.locals['db'].queryRunner.isTransactionActive) {
        await res.locals['db'].queryRunner.rollbackTransaction()
    }
    next(err)
}