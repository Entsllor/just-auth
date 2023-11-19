import vine from "@vinejs/vine";
import {Infer} from "@vinejs/vine/build/src/types";

export const SignupDto = vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(63),
    username: vine.string().minLength(1),
    lastName: vine.string().optional(),
    firstName: vine.string().optional(),
    secondName: vine.string().optional(),

    birthdate: vine.date({min: new Date('1900-01-01'), max: new Date()}).optional(),
    timezone: vine.tz().optional()
})


export type SignupDto = Infer<typeof SignupDto>

export const PublicUserDto = vine.object({
    id: vine.string().uuid(),
    username: vine.string().minLength(1),
    lastName: vine.string().optional(),
    firstName: vine.string().optional(),
    secondName: vine.string().optional(),
    createdAt: vine.datetime(),
})


export const PrivateUserDto = vine.object({
    ...PublicUserDto.getProperties(),
    email: vine.string(),
    updatedAt: vine.datetime(),
})

export const PathWithUserId = vine.object({
    id: vine.string().uuid()
})

export const publicUserValidator = vine.compile(PublicUserDto)
export const privateUserValidator = vine.compile(PrivateUserDto)