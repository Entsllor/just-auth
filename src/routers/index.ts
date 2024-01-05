import {router as usersRouter} from "./users";
import {router as authRouter} from "./auth";
import {Router} from "express";

export const routers: [string, Router][] = [
    ["/auth", authRouter],
    ["/users", usersRouter],
];
