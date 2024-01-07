import {raise} from "backend-batteries";
import {ServerResponseError} from "../exceptions";
import {ValidatorType} from "../../types/validation-utils";

export async function prepareResponse<DataOut>(validator: ValidatorType<DataOut>, data: any) {
    return await validator
        .validate(data)
        .catch(e => raise(ServerResponseError, {callback: () => console.error(e.messages)}));
}
