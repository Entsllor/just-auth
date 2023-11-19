import {raise} from "backend-batteries";
import {ServerResponseError} from "../../exceptions";
import {ValidatorType} from "../../types/validation-utils";

export async function prepareResponse<DataOut extends Partial<DataIn>, DataIn>(validator: ValidatorType<DataOut>, data: DataIn) {
    return await validator.validate(data).catch(e => raise(ServerResponseError, {callback: () => console.error(e)}))
}