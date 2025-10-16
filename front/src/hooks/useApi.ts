import { useState, useEffect, useCallback } from "react"

type ApiFunction<TInput, TOutput> = (input?: TInput) => Promise<TOutput>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useApi<TInput = void, TOutput = any>(
    apiFn: ApiFunction<TInput, TOutput>,
    options?: {
        manual?: boolean
        initialInput?: TInput
    }
) {
    const [data, setData] = useState<TOutput | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const execute = useCallback(
        async (input?: TInput) => {
            setLoading(true)
            setError(null)

            try {
                const result = await apiFn(input ?? options?.initialInput)
                setData(result)
                return result
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message)
                throw err
            } finally {
                setLoading(false)
            }
        },

        [apiFn, options?.initialInput]
    )

    useEffect(() => {
        if (!options?.manual && options?.initialInput !== undefined) {
            execute(options.initialInput)
        } else if (!options?.manual && options?.initialInput === undefined) {
            execute()
        }
    }, [options?.manual, options?.initialInput, execute])

    return { data, loading, error, execute }
}
