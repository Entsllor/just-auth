import {ZodOptional, ZodType} from "nestjs-zod/z";

export function Maybe<T extends ZodType>(t: T): ZodOptional<T> {
    return t.nullish() as any;
}
