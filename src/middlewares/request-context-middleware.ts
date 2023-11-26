import {NextFunction, Request, Response} from "express";
import {AsyncLocalStorage} from "async_hooks";

interface IRequestContext {
    id: number
    res: Response,
    req: Request
}

export const reqCtx = new AsyncLocalStorage<IRequestContext>()
let idSeq = 0

export async function requestContextMiddleware(req: Request, res: Response, next: NextFunction) {
    const store: IRequestContext = {res, req, id: idSeq}
    reqCtx.run(store, () => {
        next()
    })
}