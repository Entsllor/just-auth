import {DataSource} from "typeorm";
import {getDbSettings} from "./db.settings";
import * as dotenv from "dotenv";
import * as path from "path";
import * as process from "process";
import {REPO_PATH} from "../../helpers/paths";
import {configSchema} from "../settings/settings.schemas";

const ENV_PATH = String(path.join(REPO_PATH, ".env"));
dotenv.config({path: ENV_PATH});
export default new DataSource(getDbSettings(configSchema.parse(process.env)));
