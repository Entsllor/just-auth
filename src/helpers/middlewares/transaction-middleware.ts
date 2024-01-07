import {NextFunction, Request, Response} from "express";
import onFinished from "on-finished";
import {db} from "../../core/db";

export async function transactionMiddleware(_request: Request, res: Response, next: NextFunction) {
    const queryRunner = db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    res.locals["db"] = queryRunner.manager;
    onFinished(res, async (err, _msg) => {
        const hasError = !!err || _msg.locals.hasError;
        if (hasError) {
            await queryRunner.rollbackTransaction();
        } else {
            await queryRunner.commitTransaction();
        }
        await queryRunner.release();
    });
    next();
}
