import {AppException, InternalServerError, NotFound} from "backend-batteries";

export class UserNotFound extends NotFound {}

export class FailedToLogin extends AppException {}

export class InvalidPath extends NotFound {
    entityName = "endpoint";
}

export class NotUniqueEmail extends AppException {
    description = "Email should be unique";
}

export class NotUniqueUsername extends AppException {
    description = "Username should be unique";
}

export class ServerResponseError extends InternalServerError {
    description = "Server failed to prepare response";
}

export class AuthError extends AppException {
    status = 401;
    description = "This endpoint asserts valid access token in cookies";
}

export class AccessTokenRequired extends AuthError {}

export class FailedToVerifyToken extends AuthError {
    description = "Token is invalid, possibly expired";
}

export class CannotGetUserFromToken extends AuthError {
    description = "User is deleted or token is invalid";
}

export class RefreshTokenRequired extends AuthError {
    description = "Cannot get refresh tokens from cookies";
}
