import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CommonModule} from "./common/common.module";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {TransactionsInterceptor} from "./common/db/db.transactions.interceptor";
import {UsersModule} from "./auth/users/users.module";
import {AuthModule} from "./auth/auth.module";
import {JwtAuthGuard} from "./auth/jwt/jwt-auth.guard";

@Module({
    imports: [CommonModule, UsersModule, AuthModule],
    controllers: [AppController],
    providers: [
        AppService,
        {provide: APP_INTERCEPTOR, useClass: TransactionsInterceptor},
        {provide: APP_GUARD, useClass: JwtAuthGuard},
    ],
})
export class AppModule {}
