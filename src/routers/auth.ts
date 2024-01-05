import express from "express";
import {AuthRequired} from "../helpers/pipes/auth-required-pipe";
import {raise} from "backend-batteries";
import {RefreshTokenRequired} from "../exceptions";
import {logout, refresh, setTokensToCookies} from "../services/tokens";
import {Body} from "../helpers/pipes";
import {LoginDto, privateUserValidator, SignupDto} from "../schemas/users";
import {login, signupUser} from "../services/users";
import {prepareResponse} from "../helpers/validation/prepare-response";
import {getReqId} from "../helpers/get=req-id";

export const router = express.Router({});

router.post("/login", Body(LoginDto), async (req, res) => {
    const [refreshToken, accessToken] = await login(req.body, {
        ip: getReqId(req),
        userAgent: req.get("User-Agent"),
    });
    setTokensToCookies(res, refreshToken.body, accessToken);
    res.sendStatus(204);
});

router.post("/sign-up", Body(SignupDto), async ({body}, res) => {
    const user = await signupUser(body);
    res.status(201).send(await prepareResponse(privateUserValidator, user));
});

router.post("/refresh", AuthRequired({ignoreExpiration: true}), async (req, res) => {
    const [refreshToken, accessToken] = await refresh(req.cookies["refreshToken"] || raise(RefreshTokenRequired), {
        ip: getReqId(req),
        userAgent: req.get("User-Agent"),
        id: res.locals.user.id,
        username: res.locals.user.username,
    });
    setTokensToCookies(res, refreshToken.body, accessToken);
    res.sendStatus(204);
});

router.post("/logout", async (req, res) => {
    const refreshToken: string | undefined = req.cookies["refreshToken"];
    await logout(refreshToken);
    res.clearCookie("accessToken", {});
    res.clearCookie("refreshToken", {});
    res.sendStatus(204);
});
