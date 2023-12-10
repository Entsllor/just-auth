import {IRefreshTokensRepo} from "../types/repos/refresh-tokens";
import {IBaseDbRepo} from "./base";
import {RefreshToken} from "../models/refresh-token";
import {UUID, uuid4} from "backend-batteries";
import {appSettings} from "../settings";
import {IsNull} from 'typeorm'
import {addMinutes} from 'date-fns'

class RefreshTokensRepo extends IBaseDbRepo<RefreshToken> implements IRefreshTokensRepo {
    model = RefreshToken;

    async create(userId: UUID, authorIp: string, userAgent?: string) {
        const refreshToken = this.repo.create({
            userId, userAgent, authorIp,
            body: Buffer.from(uuid4()).toString('base64'),
            expireAt: addMinutes(new Date(), appSettings.REFRESH_TOKEN_LIFETIME_IN_MINUTES)
        })

        return await this.repo.save(refreshToken)
    }

    async markAsRevoked(tokenBody: string) {
        return await this.repo.update({
            body: tokenBody
        }, {revokedAt: new Date()}).then(value => (value.affected ?? 0) > 0);
    }

    getActive(body: string, userId?: string): Promise<RefreshToken | null> {
        return this.repo.findOne({where: {body, userId, revokedAt: IsNull()}});
    }
}

export const RefreshTokens = new RefreshTokensRepo()
