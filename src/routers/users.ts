import express from "express";
import {PathWithUserId, SignupDto} from "../schemas/users";
import {NotUniqueEmail, NotUniqueUsername, UserNotFound} from "../exceptions";

import {Body, Params, raise, uuid4, valuesOf} from 'backend-batteries'

export const router = express.Router({});
const users: Record<string, any> = {};

router.post('/sign-up', Body(SignupDto), ({body}, res) => {
    const id = uuid4()
    valuesOf(users).find(user => {
        user.email === body.email && raise(NotUniqueEmail)
        user.username === body.username && raise(NotUniqueUsername)
    })
    users[id] = {...body, id: id, password: undefined}
    res.status(201).send(users[id])
})

router.get('/:id', Params(PathWithUserId), ({params}, res) => {
    const user = users[params.id] ?? raise(UserNotFound)
    res.status(200).send(user);
})
