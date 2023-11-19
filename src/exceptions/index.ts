import {BadRequest, InternalServerError, NotFound} from "backend-batteries";

export class UserNotFound extends NotFound {
}

export class NotUniqueEmail extends BadRequest {
    description = 'Email should be unique'
}

export class NotUniqueUsername extends BadRequest {
    description = 'Username should be unique'
}

export class ServerResponseError extends InternalServerError {
    description = 'Server failed to prepare response'
}