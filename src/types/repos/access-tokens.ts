export interface IAccessTokenRepo<Payload extends object> {
    create(payload: Payload): string

    verify(token: string): (Record<string, any> & Payload) | undefined
}
