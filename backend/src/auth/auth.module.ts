import {Module} from "@nestjs/common";
import {UsersModule} from "./users/users.module";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {Settings} from "../common/settings/settings.service";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {UsersService} from "./users/users.service";
import {PasswordsService} from "./passwords/passwords.service";
import {RefreshTokensModule} from "./refresh-tokens/refresh-tokens.module";
import {CurrentUserPipe} from "./decorators/current-user.pipe";
import {ExpiredJwtStrategy} from "./jwt/expired-jwt.strategy";
import {KeyValueStorage} from "../common/key-value-storage/key-value-storage.service";
import {JwtBlockList} from "./jwt/jwt.blocklist";
import {AuthSecrets} from "./auth.secrets";

@Module({
    imports: [UsersModule, JwtModule.registerAsync({
        extraProviders: [AuthSecrets],
        inject: [Settings, AuthSecrets],
        useFactory: (settings: Settings, secrets: AuthSecrets) => ({
            publicKey: secrets.publicKey,
            privateKey: secrets.privateKey,
            signOptions: {
                expiresIn: settings.vars.JWT_LIFETIME_IN_MINUTES * 60,
                algorithm: settings.vars.JWT_ALGORITHM,
            },
        }),
    }), RefreshTokensModule],
    providers: [AuthSecrets, AuthService, PasswordsService, UsersService, CurrentUserPipe, JwtStrategy, ExpiredJwtStrategy, KeyValueStorage, JwtBlockList],
    controllers: [AuthController],
    exports: [PasswordsService],
})
export class AuthModule {
}
