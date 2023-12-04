import {NextFunction, Request, RequestHandler, Response} from "express";
import {User} from "../../models/user";
import {Users} from "../../repos/users";
import {AccessTokens} from "../../repos/access-tokens";
import {raise, UUID} from "backend-batteries";
import {AccessTokenRequired, CannotGetUserFromToken, FailedToVerifyToken} from "../../exceptions";

export function AuthRequired<Query extends {}, P extends {}, Req extends {}, Res extends {}, Locals extends Record<string, any>>(): RequestHandler<P, Res, Req, Query, Locals & {
    user: User
}> {
    return async function (_req: Request, res: Response, next: NextFunction) {
        const accessToken = res.req.cookies['accessToken'] || raise(AccessTokenRequired)
        let userId: UUID | undefined
        try {
            const tokenPayload = AccessTokens.verify(accessToken)
            userId = tokenPayload?.sub
        } catch (e) {
            raise(FailedToVerifyToken)
        }
        res.locals.user = (userId && await Users.getById(userId)) || raise(CannotGetUserFromToken)
        next()
    }
}