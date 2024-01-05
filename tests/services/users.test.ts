import {describe, expect, it} from "bun:test";
import {login, readUser, searchUsers, signupUser} from "../../src/services/users";
import {assertError, getTestUser, userData, validateTokenPair} from "../conf.test";
import {User} from "../../src/models/user";
import {faker} from "@faker-js/faker";
import {FailedToLogin, NotUniqueEmail, NotUniqueUsername} from "../../src/exceptions";
import {uuid4} from "backend-batteries";
import {Users} from "../../src/repos/users";

describe("signup user", async () => {
    it("should create user", async () => {
        const user = await signupUser(userData);
        expect(user).toBeInstanceOf(User);
        expect(user.password).not.toEqual(userData.password);
    });

    it("raise error if not unique email", async () => {
        await getTestUser();
        assertError(signupUser(({
            ...userData,
            username: faker.internet.userName(),
        })), new NotUniqueUsername);
    });

    it("raise error if not unique username", async () => {
        await getTestUser();
        assertError(signupUser(({
            ...userData,
            email: faker.internet.email(),
        })), new NotUniqueEmail);
    });
});

describe("login", async () => {
    it("should return tokens", async () => {
        const user = await getTestUser();
        const tokens = await login({email: user.email, password: userData.password}, {
            ip: faker.internet.ipv4(),
            userAgent: faker.internet.userAgent(),
        });
        validateTokenPair(...tokens, user.id);
    });

    it("raises error on password mismatch", async () => {
        const user = await getTestUser();
        assertError(login({email: user.email, password: userData.password + "invalid"}, {
            ip: faker.internet.ipv4(),
            userAgent: faker.internet.userAgent(),
        }), new FailedToLogin);
    });

    it("raises error on email mismatch", async () => {
        const user = await getTestUser();
        assertError(login({email: "invalid" + user.email, password: userData.password}, {
            ip: faker.internet.ipv4(),
            userAgent: faker.internet.userAgent(),
        }), new FailedToLogin);
    });

    it("raises error on email and password mismatch", async () => {
        const user = await getTestUser();
        assertError(login({email: "invalid" + user.email, password: userData.password + "invalid"}, {
            ip: faker.internet.ipv4(),
            userAgent: faker.internet.userAgent(),
        }), new FailedToLogin);
    });
});


describe("read user", async () => {
    it("should return user", async () => {
        const user = await getTestUser();
        expect(await readUser(user.id)).toEqual(user);
    });

    it("should return null if user does not exist", async () => {
        await getTestUser();
        expect(await readUser(uuid4())).toBeNull();
    });
});

describe("search users", async () => {
    it("should return users", async () => {
        const user = await getTestUser();
        const secondUser = await Users.create({
            ...userData,
            email: faker.internet.email(),
            username: faker.internet.userName(),
        });
        expect(await searchUsers()).toEqual([user, secondUser]);
    });

    it("should return empty list if no users", async () => {
        expect(await searchUsers()).toBeEmpty();
    });
});