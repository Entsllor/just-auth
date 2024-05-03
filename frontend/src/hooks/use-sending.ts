import {ref} from "vue"
import {isAxiosError} from "axios"

interface Options<Result, Args> {
    onSuccess?: (result: Result, args: Args) => void
    onError?: (parsed: {message: string}, args: Args) => string | void
}

export function useSending<Args extends any[], Result, TOptions extends Options<Result, Args>>(
    fn: (...args: Args) => Promise<Result>,
    options?: TOptions
) {
    const isSending = ref(false)
    const error = ref("")

    async function send(...args: Args) {
        if (isSending.value) {
            return
        }
        isSending.value = true
        error.value = ""
        try {
            const result = await fn(...args)
            options?.onSuccess?.(result, args)
            return result
        } catch (e) {
            let parsedMessage = ""
            if (isAxiosError(e)) {
                parsedMessage = e.response?.data?.message ?? "Internal Server Error"
            } else {
                parsedMessage = String(e)
            }
            const handledError = options?.onError?.({message: parsedMessage}, args)
            error.value = handledError ?? parsedMessage
        } finally {
            isSending.value = false
        }
    }

    return {
        isSending,
        error,
        send
    }
}
