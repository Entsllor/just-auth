import {IRefreshTokensRepo} from "../types/repos/refresh-tokens";
import {IBaseDbRepo} from "./base";
import {RefreshToken} from "../models/refresh-token";
import {UUID, uuid4} from "backend-batteries";

class RefreshTokensRepo extends IBaseDbRepo<RefreshToken> implements IRefreshTokensRepo {
    model = RefreshToken;

    async create(userId: UUID, authorIp: string, userAgent?: string) {
        const refreshToken = this.repo.create({
            userId, userAgent, authorIp,
            body: Buffer.from(uuid4()).toString('base64')
        })
        return await this.repo.save(refreshToken)
    }

    async markAsRevoked(userId: UUID, tokenBody: string) {
        return await this.repo.update({
            userId,
            body: tokenBody
        }, {revokedAt: new Date()}).then(value => (value.affected ?? 0) > 0);
    }
}

export const RefreshTokens = new RefreshTokensRepo()
