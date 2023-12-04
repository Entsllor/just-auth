import {UUID} from "backend-batteries";
import {RefreshToken} from "../../models/refresh-token";

export interface IRefreshTokensRepo {
    create(userId: UUID, userAgent: string, authorIp: string): Promise<RefreshToken>

    markAsRevoked(userId: UUID, tokenBody: string): Promise<boolean>
}
