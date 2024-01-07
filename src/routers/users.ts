import express from "express";
import {PathWithUserId, privateUserValidator, publicUsersValidator, publicUserValidator} from "../schemas/users";
import {UserNotFound} from "../helpers/exceptions";

import {raise} from "backend-batteries";
import {Params} from "../helpers/pipes";
import {readUser, searchUsers} from "../services/users";
import {prepareResponse} from "../helpers/validation/prepare-response";
import {AuthRequired} from "../helpers/pipes/auth-required-pipe";
import {transactionMiddleware} from "../helpers/middlewares";

export const router = express.Router({});
router.use(transactionMiddleware);

router.get("/", AuthRequired(), async ({}, res) => {
    const users = await searchUsers();
    res.status(200).send({items: await prepareResponse(publicUsersValidator, users)});
});

router.get("/me", AuthRequired(), async ({}, res) => {
    res.status(200).send(await prepareResponse(privateUserValidator, res.locals.user));
});

router.get("/:id", AuthRequired(), Params(PathWithUserId), async ({params}, res) => {
    const user = (await readUser(params.id)) ?? raise(UserNotFound);
    res.status(200).send(await prepareResponse(publicUserValidator, user));
});
