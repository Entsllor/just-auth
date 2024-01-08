import {isEqual} from "radash";
import vine, {BaseLiteralType, BaseType, VineValidator} from "@vinejs/vine";
import {AppException} from "backend-batteries";
import {expect} from "bun:test";
import type {Response} from "supertest";

export function logResponse(response: any) {
    console.log(response.body, response.status);
}

export async function validateResponse(
    response: Response,
    schema: VineValidator<any, any> | BaseLiteralType<any, any> | BaseType<any, any>
) {
    expect(response.body).toBeTruthy();
    const body = response.body as Record<any, any>;
    if (!Object.hasOwn(schema, "validate")) {
        schema = vine.compile(schema as BaseType<any, any>);
    }
    try {
        return await (schema as VineValidator<any, any>).validate(body);
    } catch (e: any) {
        return expect(e.messages).toBeEmpty();
    }
}

export function withError<T extends AppException>(error: (new () => T) | T) {
    return (res: Response) => {
        if (!res.body) {
            throw new Error("Invalid Body");
        }
        if (typeof error === "function") {
            error = new (error as any)() as T;
        }
        expect(error.toJSON().error).toBe((res.body as Record<any, any>).error);
    };
}

export function withFields(obj: any): (res: Response) => void {
    return (res: Response) => {
        if (!res.body) {
            throw new Error("Invalid Body");
        }
        const body = res.body as Record<any, any>;
        const errors: {field: string; type: string; expected: any; received?: any}[] = [];
        Object.entries(obj).forEach(([f, v]) => {
            console.log(body[f], v);

            if (!body[f]) {
                errors.push({field: f, type: "NOT_FOUND", expected: v});
            }

            if (!isEqual(body[f], v)) {
                errors.push({field: f, expected: v, received: body[f], type: "UNEQUAL"});
            }
        });
        if (errors.length) {
            console.log(errors);
            throw new Error("");
        }
    };
}
