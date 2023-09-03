import vine from "@vinejs/vine";
import {Infer} from "@vinejs/vine/build/src/types";


export const SignupDto = vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(63),
    username: vine.string().minLength(1).optional(),

    lastName: vine.string().optional(),
    firstName: vine.string().optional(),
    secondName: vine.string().optional(),
    // add birthdate and timezone
})

export const ReadUserPrivateDto = vine.object({
    id: vine.string().uuid(),
    username: vine.string().minLength(1).optional(),
    lastName: vine.string().optional(),
    firstName: vine.string().optional(),
    secondName: vine.string().optional(),
})

export type IReadUserPrivateDto = Infer<typeof ReadUserPrivateDto>

export const PathWithUserId = vine.object({
    id: vine.string().uuid()
})
