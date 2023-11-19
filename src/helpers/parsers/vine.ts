import {ConstructableSchema, FieldContext, Infer} from "@vinejs/vine/build/src/types";
import {isIsoDateString, isValidDate} from "backend-batteries";
import vine from "@vinejs/vine";

type ParserFieldContext = Pick<FieldContext, 'data' | 'parent' | 'meta'>;
type InferableVineType = ConstructableSchema<any, any> & { parse: (value: unknown, ctx?: ParserFieldContext) => any };

export type WithDefaultParser = <TVineSchema extends InferableVineType>(vineType: TVineSchema, defaultValue: Infer<TVineSchema>) => TVineSchema

export const withDefault: WithDefaultParser = (vineType, defaultValue) => {
    // If value extends undefined (not null) then validator return default value
    return vineType.parse((value: unknown) => value === undefined ? defaultValue : value)
};

export const coalesce: WithDefaultParser = (vineType, defaultValue) => {
    // If value is undefined or null then validator return default value
    return vineType.parse((value: unknown) => value ?? defaultValue)
};

interface IDateTimeRuleTypeOptions {
    min?: Date,
    max?: Date,
}

interface IDateRuleTypeOptions extends IDateTimeRuleTypeOptions {
}

export const datetimeRule = vine.createRule((value, options: IDateTimeRuleTypeOptions, field) => {
    if (!isIsoDateString(value)) {
        return field.report(`{{ field }} is not a valid date-string. Expected date in format ${new Date().toISOString()}`, 'datetime', field);
    }
    if (options.min && options.min.toISOString() > value) {
        return field.report(`{{ field }} expected to be bigger or equal ${options.min.toISOString()}`, 'datetime', field);
    }
    if (options.max && options.max.toISOString() < value) {
        return field.report(`{{ field }} expected to be lower or equal ${options.max.toISOString()}`, 'datetime', field);
    }
    return value
})

function isoDatetimeToDateString(isoDateTime: string | Date): string {
    return (typeof isoDateTime === "string" ? isoDateTime : isoDateTime.toISOString()).slice(0, 10)
}

export const dateRule = vine.createRule((value, options: IDateRuleTypeOptions, field) => {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !isValidDate(value)) {
        return field.report(`{{ field }} is not a valid date-string. Expected date in format ${new Date().toISOString().slice(0, 10)}`, 'date', field);
    }
    const parsedValue = isoDatetimeToDateString(new Date(value))
    if (options.min && isoDatetimeToDateString(options.min) > parsedValue) {
        return field.report(`{{ field }} expected to be bigger or equal ${isoDatetimeToDateString(options.min)}`, 'date', field);
    }
    if (options.max && isoDatetimeToDateString(options.max) < parsedValue) {
        return field.report(`{{ field }} expected to be lower or equal ${isoDatetimeToDateString(options.max)}`, 'date', field);
    }
    return parsedValue
})

export function datetimeType(options: IDateTimeRuleTypeOptions = {}) {
    return vine.string().trim().use(datetimeRule(options))
}

export function dateType(options: IDateRuleTypeOptions = {}) {
    return vine.string().trim().use(dateRule(options));
}

export function datetimeOutType() {
    // vine.js has no built-in datetime type
    return vine.any()
}

export function timezoneType() {
    return vine.enum(Intl.supportedValuesOf('timeZone'))
}