import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthSecrets} from "../auth.secrets";

@Injectable()
export class ExpiredJwtStrategy extends PassportStrategy(Strategy, "expired-jwt") {
    constructor(secrets: AuthSecrets) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: secrets.publicKey ?? secrets.privateKey,
        });
    }

    async validate(payload: any) {
        return {...payload};
    }
}
