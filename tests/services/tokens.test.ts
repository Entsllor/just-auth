import {describe, expect, it} from "bun:test";
import {getTestUser, userData, validateTokenPair} from "../conf.test";
import {createTokens, logout, refresh} from "../../src/services/tokens";
import {RefreshTokens} from "../../src/repos/refresh-tokens";
import {faker} from "@faker-js/faker";
import {Forbidden} from "backend-batteries";
import {Users} from "../../src/repos/users";

describe('createTokens', async () => {
    it('should create pair of tokens', async () => {
        const user = await getTestUser()
        const userInfo = {username: user.username, userAgent: 'test', ip: faker.internet.ipv4(), id: user.id}
        const [refresh, access] = await createTokens(userInfo)
        validateTokenPair(refresh, access, user.id)
    })
})

describe('refresh', async () => {
    it('should refresh token', async () => {
        const user = await getTestUser()
        const refreshToken = await RefreshTokens.create(user.id, faker.internet.ipv4(), faker.internet.userAgent())
        const tokensPair = await refresh(refreshToken.body, {
            id: user.id,
            username: user.username,
            ip: faker.internet.ipv4(),
            userAgent: faker.internet.userAgent()
        })
        expect(await RefreshTokens.getActive(refreshToken.body, user.id)).toBeNull() // old token is revoked
        validateTokenPair(...tokensPair, user.id)
    })

    it('should raise error if token is revoked', async () => {
        const user = await getTestUser()
        const refreshToken = await RefreshTokens.create(user.id, faker.internet.ipv4(), faker.internet.userAgent())
        await RefreshTokens.markAsRevoked(refreshToken.body)
        expect(async () => await refresh(refreshToken.body, {
            id: user.id,
            username: user.username,
            ip: faker.internet.ip(),
            userAgent: faker.internet.userAgent()
        })).toThrow(new Forbidden)
    })

    it("should raise error if user tries to use another user's token", async () => {
        const user = await getTestUser()
        const anotherUser = await Users.create({...userData, email: faker.internet.email(), username: 'another'})
        const refreshToken = await RefreshTokens.create(user.id, faker.internet.ipv4(), faker.internet.userAgent())
        expect(async () => await refresh(refreshToken.body, {
            id: anotherUser.id,
            username: anotherUser.username,
            ip: faker.internet.ip(),
            userAgent: faker.internet.userAgent()
        })).toThrow(new Forbidden)
    })
})

describe('logout', async () => {
    it('should revoke refresh token', async () => {
        const user = await getTestUser()
        const refreshToken = await RefreshTokens.create(user.id, faker.internet.ipv4(), faker.internet.userAgent())
        expect(await logout(refreshToken.body)).toBeTrue()
        expect(await RefreshTokens.getActive(refreshToken.body, user.id)).toBeNull() // token is revoked
    })

    it('ok if token is invalid', async () => {
        expect(await logout('invalid-refresh-token')).toBeFalse()
    })

    it('ok if token is not passed', async () => {
        expect(await logout()).toBeUndefined()
    })
})