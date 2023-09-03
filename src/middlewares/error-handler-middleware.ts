import {NextFunction, Request, Response} from "express";
import {errors} from "@vinejs/vine";
import {AppException, InternalServerError} from "backend-batteries";

export function ErrorHandlerMiddleware(err: any, _: Request, res: Response, __: NextFunction) {
    if (err instanceof errors.E_VALIDATION_ERROR) {
        res.status(422).send(err.messages)
    }
    if (err instanceof AppException) {
        res.status(err.status).send(err.asJson())
    } else {
        console.error(err.message)
        res.status(500).send(new InternalServerError({}).asJson())
    }
}
