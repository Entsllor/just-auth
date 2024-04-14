import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Settings} from "../../common/settings/settings.service";
import {IRequest} from "../../helpers/types/util-types";
import {JwtBlockList} from "./jwt.blocklist";
import {raise} from "backend-batteries";
import {getAccessTokenFromRequest} from "./jwt.helpers";
import {ClsService} from "nestjs-cls";
import {AuthSecrets} from "../auth.secrets";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(settings: Settings, secrets: AuthSecrets, private jwtBlockList: JwtBlockList, private cls: ClsService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secrets.privateKey,
            algorithms: settings.vars.JWT_ALGORITHM,
            passReqToCallback: true,
        });
    }

    async validate(req: IRequest, payload: any) {
        const jwt = getAccessTokenFromRequest(req);
        if (jwt && await this.jwtBlockList.has(jwt)) {
            raise(UnauthorizedException);
        }
        this.cls.set("userId", payload.sub);
        return {...payload};
    }
}
