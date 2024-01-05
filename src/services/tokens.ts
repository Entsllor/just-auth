import {RefreshTokens} from "../repos/refresh-tokens";
import {RefreshToken} from "../models/refresh-token";
import {AccessTokens} from "../repos/access-tokens";
import {Forbidden, raise} from "backend-batteries";
import {CookieOptions} from "express";

type IUserInfo = {
    id: string;
    userAgent?: string;
    ip: string;
    username: string;
};

export async function createTokens(userInfo: IUserInfo): Promise<[RefreshToken, string]> {
    return [
        await RefreshTokens.create(userInfo.id, userInfo.ip, userInfo.userAgent),
        AccessTokens.create({
            sub: userInfo.id,
            username: userInfo.username,
        }),
    ];
}

export async function refresh(refreshTokenBody: string, userInfo: IUserInfo): Promise<[RefreshToken, string]> {
    (await RefreshTokens.getActive(refreshTokenBody, userInfo.id)) || raise(Forbidden);
    await RefreshTokens.markAsRevoked(refreshTokenBody);
    return await createTokens(userInfo);
}

export async function logout(refreshToken?: string): Promise<boolean | undefined> {
    if (refreshToken) {
        return await RefreshTokens.markAsRevoked(refreshToken);
    }
}

export function setTokensToCookies(
    res: {
        cookie: (name: string, val: string, options: CookieOptions) => void;
    },
    refreshToken: string,
    accessToken: string
) {
    res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true});
    res.cookie("accessToken", accessToken, {httpOnly: true, secure: true});
}
