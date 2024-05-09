import {isAxiosError} from "axios";

export function handleError(error: unknown) {
    let parsedMessage = ""
    if (isAxiosError(error)) {
        parsedMessage = error.response?.data?.message ?? "Internal Server Error"
    } else {
        parsedMessage = String(error)
    }
    return parsedMessage
}