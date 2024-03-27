import {IAccessTokenRepo} from "../types/repos/access-tokens";
import jwt from "jsonwebtoken";
import {appSettings} from "../core/settings";
import {IAccessTokenPayload} from "../types/tokens";

class AccessTokensRepo implements IAccessTokenRepo<IAccessTokenPayload> {
    create(data: IAccessTokenPayload): string {
        return jwt.sign(data, appSettings.JWT_PRIVATE_SECRET_KEY, {
            expiresIn: appSettings.ACCESS_TOKEN_LIFETIME_IN_MINUTES + "m",
            algorithm: appSettings.JWT_ALGORITHM,
        });
    }

    verify(token: string, ignoreExpiration: boolean = false) {
        return jwt.verify(token, appSettings.JWT_PUBLIC_SECRET_KEY, {ignoreExpiration}, (error, decoded: any) => {
            if (error) {
                throw error;
            }
            return {
                sub: decoded.sub,
                username: decoded.username,
            } satisfies IAccessTokenPayload;
        }) as IAccessTokenPayload | undefined;
    }
}

export const AccessTokens = new AccessTokensRepo();
