import {z} from "nestjs-zod/z";

const timeZones = new Set(Intl.supportedValuesOf("timeZone") as [string, ...string[]]);
export const timeZoneType = z
    .string()
    .trim()
    .refine(arg => timeZones.has(arg), "Invalid time zone");
