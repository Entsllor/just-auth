import express from "express";
import {AuthRequired} from "../helpers/pipes/auth-required-pipe";
import {raise} from "backend-batteries";
import {RefreshTokenRequired} from "../exceptions";
import {logout, refresh, setTokensToCookies} from "../services/tokens";
import {Body} from "../helpers/pipes";
import {LoginDto} from "../schemas/users";
import {login} from "../services/users";

export const router = express.Router({});

router.post('/login', Body(LoginDto), async (req, res) => {
    const [refreshToken, accessToken] = await login(req.body, {ip: req.ip, userAgent: req.get('User-Agent')});
    setTokensToCookies(res, refreshToken.body, accessToken)
    res.sendStatus(204)
})


router.post('/refresh', AuthRequired({ignoreExpiration: true}), async (req, res) => {
    const [refreshToken, accessToken] = await refresh(
        req.cookies['refreshToken'] || raise(RefreshTokenRequired), {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            id: res.locals.user.id,
            username: res.locals.user.username
        })
    setTokensToCookies(res, refreshToken.body, accessToken)
    res.sendStatus(204);
})

router.post('/logout', async (req, res) => {
    const refreshToken = req.cookies['refreshToken']
    await logout(refreshToken)
    res.clearCookie('accessToken', {})
    res.clearCookie('refreshToken', {})
    res.sendStatus(204)
})

