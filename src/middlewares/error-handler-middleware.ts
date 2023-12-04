import {NextFunction, Request, Response} from "express";
import {errors} from "@vinejs/vine";
import {AppException, InternalServerError} from "backend-batteries";

export function errorHandlerMiddleware(err: any, _request: Request, res: Response, _nextFunction: NextFunction) {
    if (err instanceof errors.E_VALIDATION_ERROR) {
        res.status(422).send(err.messages)
    } else if (err instanceof AppException) {
        if (err.callback) {
            err.callback(err)
        }
        if (err.status >= 500) {
            console.log(err)
        }
        res.status(err.status).send(err.asJson());
    } else if (err.status) {
        if (err.message) {
            res.status(err.status).json({message: err.message, status: err.status});
        } else if (err.body) {
            res.status(err.status).send(err.body);
        }
    } else {
        console.error(err.message)
        if (!res.headersSent) {
            res.status(err.status ?? 500)
        }
        res.send(new InternalServerError({}).asJson());
    }
}
