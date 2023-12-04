import {UUID} from "backend-batteries";

export type IUserRequestInfo = {
    ip: string
    userAgent: string
};

export interface IAccessTokenPayload extends IUserRequestInfo {
    id: UUID
    username: string
}