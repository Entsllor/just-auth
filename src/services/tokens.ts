import {RefreshTokens} from "../repos/refresh-tokens";
import {RefreshToken} from "../models/refresh-token";
import {AccessTokens} from "../repos/access-tokens";

type IUserInfo = {
    id: string,
    userAgent?: string,
    ip: string
    username: string
};

export async function createTokens(userInfo: IUserInfo): Promise<[RefreshToken, string]> {
    return [await RefreshTokens.create(userInfo.id, userInfo.ip, userInfo.userAgent), AccessTokens.create({
        sub: userInfo.id,
        username: userInfo.username
    })]
}

export async function revokeToken(refreshToken: string, userInfo: IUserInfo): Promise<[RefreshToken, string]> {
    await RefreshTokens.markAsRevoked(userInfo.id, refreshToken)
    return createTokens(userInfo)
}