import vine from "@vinejs/vine";
import {Infer} from "@vinejs/vine/build/src/types";

const usernameType = vine
    .string()
    .minLength(5)
    .toLowerCase()
    .regex(/^[a-zA-Z0-9_.]+$/);

export const SignupDto = vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(63),
    username: usernameType,
    lastName: vine.string().optional(),
    firstName: vine.string().optional(),
    secondName: vine.string().optional(),
    birthdate: vine.day({min: new Date("1900-01-01")}).optional(),
    timezone: vine.tz().optional(),
});

export type SignupDto = Infer<typeof SignupDto>;

export const LoginDto = vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
});
export type LoginDto = Infer<typeof LoginDto>;

export const PublicUserDto = vine.object({
    id: vine.string().uuid(),
    username: usernameType,
    lastName: vine.string().optional(),
    firstName: vine.string().optional(),
    secondName: vine.string().optional(),
    createdAt: vine.datetime(),
});

export const PrivateUserDto = vine.object({
    ...PublicUserDto.getProperties(),
    email: vine.string(),
    updatedAt: vine.datetime(),
});

export const PathWithUserId = vine.object({
    id: vine.string().uuid(),
});

export const publicUserValidator = vine.compile(PublicUserDto);
export const privateUserValidator = vine.compile(PrivateUserDto);
export const publicUsersValidator = vine.compile(vine.array(PrivateUserDto));
