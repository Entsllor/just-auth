import {ref} from "vue"
import {handleError} from "@/utils/handle-error"

interface Options<Result, Args> {
    onSuccess?: (result: Result, args: Args) => void
    onError?: (parsed: {message: string}, args: Args) => string | void
}

export function useAction<Args extends any[], Result, TOptions extends Options<Result, Args>>(
    fn: (...args: Args) => Promise<Result> | Result,
    options?: TOptions
) {
    const pending = ref(false)
    const error = ref("")

    async function act(...args: Args) {
        if (pending.value) {
            return
        }
        pending.value = true
        error.value = ""
        try {
            const result = await fn(...args)
            options?.onSuccess?.(result, args)
            return result
        } catch (e) {
            const parsedMessage = handleError(e)
            const handledError = options?.onError?.({message: parsedMessage}, args)
            error.value = handledError ?? parsedMessage
        } finally {
            pending.value = false
        }
    }

    return {
        pending: pending.value,
        error,
        act
    }
}
