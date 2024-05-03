import {BadRequest, NotFound} from "backend-batteries";

export class UserNotFound extends NotFound {
    entityName = "user";
}

export class NotUniqueUsername extends BadRequest {
    message = "This username is already in use";
}

export class NotUniqueEmail extends BadRequest {
    message = "This email is already in use";
}

export class NotValidLoginOrPassword extends BadRequest {
    message = "Wrong login or password";
}

export class AccessTokenRequired extends BadRequest {
    message = "Cannot find accessToken in headers";
}

export class RefreshTokenRequired extends BadRequest {
    message = "Cannot find refreshToken in cookies";
}

export class FailedToParseClientIp extends BadRequest {}

export class FailedToParseUserAgent extends BadRequest {}

export class FailedToRefreshTokenForbidden extends BadRequest {
    status = 403;
}
