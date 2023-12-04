import {IAccessTokenRepo} from "../types/repos/access-tokens";
import jwt from 'jsonwebtoken'
import {appSettings} from "../settings";
import {IAccessTokenPayload} from "../types/tokens";

class AccessTokensRepo implements IAccessTokenRepo<IAccessTokenPayload> {
    create(data: IAccessTokenPayload): string {
        return jwt.sign(data, appSettings.JWT_SECRET_KEY, {expiresIn: appSettings.ACCESS_TOKEN_LIFETIME_IN_MINUTES * 60 * 1000});
    }

    verify(token: string) {
        return jwt.verify(token, appSettings.JWT_SECRET_KEY, (error, decoded: any) => {
            if (error) {
                return undefined
            }
            return {
                sub: decoded.sub,
                username: decoded.username
            } satisfies IAccessTokenPayload
        }) as IAccessTokenPayload | undefined;
    }
}

export const AccessTokens = new AccessTokensRepo()