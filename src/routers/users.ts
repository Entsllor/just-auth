import express from "express";
import {
    LoginDto,
    PathWithUserId,
    privateUserValidator,
    publicUsersValidator,
    publicUserValidator,
    SignupDto
} from "../schemas/users";
import {UserNotFound} from "../exceptions";

import {raise} from 'backend-batteries'
import {Body, Params} from "../helpers/pipes";
import {login, readUser, searchUsers, signupUser} from "../services/users";
import {prepareResponse} from "../helpers/validation/prepare-response";
import {AuthRequired} from "../helpers/pipes/auth-required-pipe";

export const router = express.Router({});

router.post('/sign-up', Body(SignupDto), async ({body}, res) => {
    const user = await signupUser(body);
    res.status(201).send(await prepareResponse(privateUserValidator, user))
})

router.post('/login', Body(LoginDto), async (req, res) => {
    const [refreshToken, accessToken] = await login(req.body, {ip: req.ip, userAgent: req.get('User-Agent')});
    res.cookie('accessToken', accessToken)
    res.cookie('refreshToken', refreshToken.body)
    res.sendStatus(204)
})

router.get('/', async ({}, res) => {
    const users = await searchUsers();
    res.status(201).send({items: await prepareResponse(publicUsersValidator, users)})
})

router.get('/me', AuthRequired(), async ({}, res) => {
    res.status(200).send(await prepareResponse(privateUserValidator, res.locals.user));
})

router.get('/:id', Params(PathWithUserId), async ({params}, res) => {
    const user = await readUser(params.id) ?? raise(UserNotFound)
    res.status(200).send(await prepareResponse(publicUserValidator, user));
})

router.post('/revoke', AuthRequired(), async ({}, res) => {
    res.locals.user
    res.sendStatus(204);
})
