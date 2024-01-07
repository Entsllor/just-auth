import type {Request} from "express";

export function getRequestIp(request: Request<any, any, any, any, any>): string {
    return request.ip ?? "255.255.255.255";
}
