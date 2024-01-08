import {AppException, InternalServerError, NotFound} from "backend-batteries";

export class UserNotFound extends NotFound {}

export class FailedToLogin extends AppException {}

export class InvalidPath extends NotFound {
    entityName = "endpoint";
}

export class NotUniqueEmail extends AppException {
    message = "Email should be unique";
}

export class NotUniqueUsername extends AppException {
    message = "Username should be unique";
}

export class ServerResponseError extends InternalServerError {
    message = "Server failed to prepare response";
}

export class AuthError extends AppException {
    status = 401;
    message = "This endpoint asserts valid access token in cookies";
}

export class AccessTokenRequired extends AuthError {}

export class FailedToVerifyToken extends AuthError {
    message = "Token is invalid, possibly expired";
}

export class CannotGetUserFromToken extends AuthError {
    message = "User is deleted or token is invalid";
}

export class RefreshTokenRequired extends AuthError {
    message = "Cannot get refresh tokens from cookies";
}
