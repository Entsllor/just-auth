import {NextFunction, Request, Response} from "express";
import {errors} from "@vinejs/vine";
import {AppException, InternalServerError} from "backend-batteries";

export function ErrorHandlerMiddleware(err: any, request: Request, res: Response, nextFunction: NextFunction) {
    if (err instanceof errors.E_VALIDATION_ERROR) {
        res.status(422).send(err.messages)
    } else if (err instanceof AppException) {
        res.status(err.status).send(err.asJson())
    } else if (err.status && err.body) {
        res.status(err.status).send(err.body)
    } else {
        console.error(err.message)
        res.status(err.status ?? 500).send(new InternalServerError({}).asJson())
    }
}
