import {Injectable} from "@nestjs/common";
import {Settings} from "../common/settings/settings.service";
import path from "node:path";
import fs from "node:fs";
import {REPO_PATH} from "../helpers/paths";
import dotenv from "dotenv";

@Injectable()
export class AuthSecrets {
    publicKey: string | undefined;
    privateKey: string;
    readonly #keysPath: string;

    constructor(settings: Settings) {
        dotenv.config({path: path.join(REPO_PATH, ".env")});
        this.privateKey = process.env.JWT_PRIVATE_KEY ?? "";
        this.publicKey = process.env.JWT_PUBLIC_KEY;
        this.#keysPath = path.join(REPO_PATH, '..', "keys", "auth", settings.vars.NODE_ENV === "production" ? "" : settings.vars.NODE_ENV);

        const isRsa = settings.vars.JWT_ALGORITHM.startsWith("RS");
        if (!isRsa) {
            this.publicKey = undefined;
            this.privateKey = this.privateKey || this.readKey("private");
            return;
        }

        // handle rsa keys
        if (!this.publicKey) {
            this.publicKey = this.readKey("public");
        }
        if (!this.privateKey) {
            this.privateKey = this.readKey("private");
        }
    }

    private readKey(keyType: "public" | "private") {
        const filename = keyType === "private" ? "jwt.key" : "jwt.key.pub";
        const filePath = path.join(this.#keysPath, filename);
        let key: string = "";
        try {
            key = fs.readFileSync(filePath).toString();
        } catch (error) {
            console.error(`Cannot read ${keyType} key in ${filePath}`);
            throw error;
        }
        if (!key) {
            throw new Error(`${keyType} key is invalid`);
        }
        return key;
    }
}