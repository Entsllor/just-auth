import {datasource} from "./data-source";

export const db = await datasource.initialize();
