import {describe, expect, it} from "bun:test";
import {appClient, getAuthClient, userData} from "../conf.test";
import {privateUserValidator, publicUsersValidator, publicUserValidator} from "../../src/schemas/users";
import {Users} from "../../src/repos/users";
import {range} from "radash";
import {faker} from "@faker-js/faker";
import {uuid4} from "backend-batteries";

describe('read users', async () => {
    it('should return users', async () => {
        const usersCount = 5
        for (let _ of range(1, usersCount)) {
            await Users.create({
                ...userData,
                email: faker.internet.email(),
                username: faker.person.firstName() + faker.date.past().getFullYear()
            })
        }
        const res = await (await getAuthClient()).get('/users/').expect(200)
        await publicUsersValidator.validate(res.body.items)
        expect(res.body.items.length).toBe(usersCount + 1) // created + me
    })

    it('auth required', async () => {
        await appClient.get('/users/').expect(401)
    })
})

describe('read me', async () => {
    it('should return user', async () => {
        const client = await getAuthClient()
        const res = await client.get('/users/me/').expect(200)
        await privateUserValidator.validate(res.body)
    })

    it('auth required', async () => {
        await appClient.get('/users/me/').expect(401)
    })
})

describe('read another user', async () => {
    it('should return user', async () => {
        const client = await getAuthClient()
        const newUser = await Users.create({...userData, email: faker.internet.email(), username: 'another'})
        const res = await client.get(`/users/${newUser.id}/`).expect(200)
        await publicUserValidator.validate(res.body)
    })

    it('404 if not exists', async () => {
        const client = await getAuthClient()
        await client.get(`/users/${uuid4()}`).expect(404)
    })

    it('auth required', async () => {
        const newUser = await Users.create({...userData, email: faker.internet.email(), username: 'another'})
        await appClient.get(`/users/${newUser.id}`).expect(401)
    })
})
