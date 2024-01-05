import {describe, expect, it, test} from "bun:test";
import {omit} from "radash";
import {appClient} from "../conf.test";
import {PrivateUserDto, SignupDto} from "../../src/schemas/users";
import {validateResponse, withError} from "../testing-helpers";
import {Users} from "../../src/repos/users";
import {AccessTokenRequired, FailedToLogin, RefreshTokenRequired} from "../../src/exceptions";
import {RefreshTokens} from "../../src/repos/refresh-tokens";
import {AccessTokens} from "../../src/repos/access-tokens";

const userData: SignupDto = {
    password: "password",
    email: "test@example.com",
    username: "username",
    birthdate: undefined,
    firstName: undefined,
    lastName: undefined,
    secondName: undefined,
    timezone: undefined,
};


describe("signup", async () => {
    const userSignupData = {username: "johny", email: "test@example.com", password: "password"};

    it("should create user", async () => {
        const resp = await appClient.post("/auth/sign-up").send(userSignupData).expect(201);
        await validateResponse(resp, PrivateUserDto);
    });

    it("password is required", async () => {
        await appClient
            .post("/auth/sign-up")
            .send(omit(userSignupData, ["password"]))
            .expect(422);
    });
});

describe("login", async () => {
    it("should work", async () => {
        await Users.create(userData);
        const res = await appClient
            .post("/auth/login")
            .send({email: userData.email, password: userData.password})
            .expect(204);
        const cookies = res.headers["set-cookie"] as unknown as string[];
        expect(cookies[0]).toStartWith("refreshToken");
        expect(cookies[0]).toContain("HttpOnly");
        expect(cookies[1]).toStartWith("accessToken");
        expect(cookies[1]).toContain("HttpOnly");
    });

    it("fails if wrong password", async () => {
        await Users.create(userData);
        await appClient
            .post("/auth/login")
            .send({email: userData.email, password: userData.password + "wrong"})
            .expect(400)
            .expect(withError(FailedToLogin));
    });

    it("fails if wrong email", async () => {
        await Users.create(userData);
        await appClient
            .post("/auth/login")
            .send({email: userData.email + "wrong", password: userData.password})
            .expect(400);
    });
});

describe("refresh-tokens", async () => {
    it("access token required", async () => {
        const user = await Users.create(userData);
        const refreshToken = await RefreshTokens.create(user.id, "180.180.180.180", "test");
        await appClient.post("/auth/refresh").set("Cookie", [`refreshToken=${refreshToken.body}`]).expect(401).expect(withError(AccessTokenRequired));
    });
    it("refresh token required", async () => {
        const user = await Users.create(userData);
        const accessToken = AccessTokens.create({sub: user.id, username: user.username});
        await appClient.post("/auth/refresh").set("Cookie", [`accessToken=${accessToken}`]).expect(401).expect(withError(RefreshTokenRequired));
    });
    it("should return new tokens pair", async () => {
        const user = await Users.create(userData);
        const accessToken = AccessTokens.create({sub: user.id, username: user.username});
        const refreshToken = await RefreshTokens.create(user.id, "180.180.180.180", "test");
        const resp = await appClient.post("/auth/refresh").set("Cookie", [`accessToken=${accessToken};refreshToken=${refreshToken.body}`]).expect(204);
        const cookies = resp.headers["set-cookie"] as unknown as string[];
        expect(cookies[0]).toStartWith("refreshToken");
        expect(cookies[0]).toContain("HttpOnly");
        expect(cookies[1]).toStartWith("accessToken");
        expect(cookies[1]).toContain("HttpOnly");
    });
});

describe("logout", async () => {
    it("should clear cookies", async () => {
        const user = await Users.create(userData);
        const refreshToken = await RefreshTokens.create(user.id, "180.180.180.180", "test");
        const resp = await appClient.post("/auth/logout").set("Cookie", [`refreshToken=${refreshToken.body}`]).expect(204);
        const cookies = resp.headers["set-cookie"] as unknown as string[];
        expect(cookies[0]).toContain("accessToken=;");
        expect(cookies[1]).toContain("refreshToken=;");
    });

    it("ok if no refreshToken", async () => {
        const resp = await appClient.post("/auth/logout").expect(204);
        const cookies = resp.headers["set-cookie"] as unknown as string[];
        expect(cookies[0]).toContain("accessToken=;");
        expect(cookies[1]).toContain("refreshToken=;");
    });
});