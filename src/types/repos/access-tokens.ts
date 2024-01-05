export interface IAccessTokenRepo<Payload extends object> {
    create(payload: Payload): string;

    verify(token: string, ignoreExpiration: boolean): (Record<string, any> & Payload) | undefined;
}
