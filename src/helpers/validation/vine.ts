import {ConstructableSchema, FieldOptions, Infer, Validation} from "@vinejs/vine/build/src/types";
import {isIsoDateString, isValidDate} from "backend-batteries";
import vine, {BaseLiteralType, Vine} from "@vinejs/vine";

type InferableVineType = ConstructableSchema<any, any> & {parse: (value: unknown, ctx?: any) => any};

export type WithDefaultParser = <TVineSchema extends InferableVineType>(
    vineType: TVineSchema,
    defaultValue: Infer<TVineSchema>
) => TVineSchema;

export const withDefault: WithDefaultParser = (vineType, defaultValue) => {
    // If value is undefined or null then validator return default value
    return vineType.parse((value: unknown) => value ?? defaultValue);
};

interface IDateTimeRuleTypeOptions {
    min?: Date;
    max?: Date;
}

interface IDateRuleTypeOptions extends IDateTimeRuleTypeOptions {}

const datetimeRule = vine.createRule((value, options: IDateTimeRuleTypeOptions, field) => {
    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
            return field.report(`{{ field }} is not a valid date.`, "datetime", field);
        }
    } else if (!isIsoDateString(value)) {
        return field.report(
            `{{ field }} is not a valid date-string. Expected date in format ${new Date().toISOString()}`,
            "datetime",
            field
        );
    }
    if (options.min && options.min.toISOString() > value) {
        return field.report(
            `{{ field }} expected to be bigger or equal ${options.min.toISOString()}`,
            "datetime",
            field
        );
    }
    if (options.max && options.max.toISOString() < value) {
        return field.report(
            `{{ field }} expected to be lower or equal ${options.max.toISOString()}`,
            "datetime",
            field
        );
    }
    return value;
});

function isoDatetimeToDateString(isoDateTime: string | Date): string {
    return (typeof isoDateTime === "string" ? isoDateTime : isoDateTime.toISOString()).slice(0, 10);
}

const dateRule = vine.createRule((value, options: IDateRuleTypeOptions, field) => {
    if (!isValidDate(value)) {
        return field.report(
            `{{ field }} is not a valid date. Expected date in format ${new Date().toISOString().slice(0, 10)}`,
            "date",
            field
        );
    }
    if (typeof value === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return field.report(
            `{{ field }} is not a valid date-string. Expected date in format ${new Date().toISOString().slice(0, 10)}`,
            "date",
            field
        );
    }
    const parsedValue = isoDatetimeToDateString(new Date(value));
    if (options.min && isoDatetimeToDateString(options.min) > parsedValue) {
        return field.report(
            `{{ field }} expected to be bigger or equal ${isoDatetimeToDateString(options.min)}`,
            "date",
            field
        );
    }
    if (options.max && isoDatetimeToDateString(options.max) < parsedValue) {
        return field.report(
            `{{ field }} expected to be lower or equal ${isoDatetimeToDateString(options.max)}`,
            "date",
            field
        );
    }
    return parsedValue;
});

function dateType(options: IDateRuleTypeOptions = {}) {
    return vine.string().trim().use(dateRule(options));
}

function timezoneType() {
    return vine.enum(Intl.supportedValuesOf("timeZone"));
}

class VineDateTime extends BaseLiteralType<Date, Date> {
    readonly #fieldOptions?: IDateTimeRuleTypeOptions;

    constructor(fieldOptions?: IDateTimeRuleTypeOptions, options?: FieldOptions, validations?: Validation<any>[]) {
        super(options, validations || [datetimeRule(fieldOptions ?? {})]);
        this.#fieldOptions = fieldOptions;
    }

    clone() {
        return new VineDateTime(this.#fieldOptions, this.cloneOptions(), this.cloneValidations()) as this;
    }
}

Vine.macro("datetime", (options?) => new VineDateTime(options));
Vine.macro("day", dateType);
Vine.macro("tz", timezoneType);

declare module "@vinejs/vine" {
    interface Vine {
        datetime(options?: IDateRuleTypeOptions): VineDateTime;

        day: typeof dateType;
        tz: typeof timezoneType;
    }
}
