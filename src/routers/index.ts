import {router as usersRouter} from './users';
import {Router} from "express";

export const routers: [string, Router][] = [
    ['/users', usersRouter],
]