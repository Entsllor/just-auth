import {afterAll, beforeEach, expect} from "bun:test";
import request from "supertest";
import {createApp} from "../src/create-app";
import {SignupDto} from "../src/schemas/users";
import {Users} from "../src/repos/users";
import {AccessTokens} from "../src/repos/access-tokens";
import {User} from "../src/models/user";

import {db} from "../src/core/data-source";
import {RefreshToken} from "../src/models/refresh-token";

export let [app] = createApp();
export let appClient = request(app);
export let currentUser: User | undefined; // use for authorized requests (see getAuthClient)

beforeEach(async () => {
    const entities = db.entityMetadatas;
    const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(", ");
    await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
    currentUser = undefined;
});
afterAll(async () => {
    await db.destroy();
});

export const userData: SignupDto = {
    password: "password",
    email: "test@example.com",
    username: "username",
    birthdate: undefined,
    firstName: undefined,
    lastName: undefined,
    secondName: undefined,
    timezone: undefined,
};

export async function getTestUser(): Promise<User> {
    if (!currentUser) {
        currentUser = await Users.create(userData);
    }
    return currentUser;
}

export async function getAuthClient() {
    const user = await getTestUser();
    const accessToken = AccessTokens.create({sub: user.id, username: user.username});
    const client = request(app);

    // Set cookie for every http method
    for (let method of ["post", "get", "delete", "put", "head", "options"] as const) {
        const prev = client[method];
        client[method] = (url, callback) => prev(url, callback).set("Cookie", [`accessToken=${accessToken};`]);
    }
    return client;
}

export function validateTokenPair(refreshToken: RefreshToken, accessToken: string, userId: string) {
    expect(refreshToken).toBeInstanceOf(RefreshToken);
    expect(refreshToken.userId).toBe(userId);
    expect(accessToken).toBeTypeOf("string");
    expect(AccessTokens.verify(accessToken)?.sub).toBe(userId);
    return true;
}

export function assertError(action: Promise<any> | any, error: Error | typeof Error | string) {
    expect(async () => await action).toThrow(error);
}
