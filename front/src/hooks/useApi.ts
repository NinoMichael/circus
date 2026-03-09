/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { api } from '../services/api'

export function useApi<T = any>() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string[] | null>(null);

    async function request(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        data?: any
    ): Promise<T | null> {
        setLoading(true)
        setError(null)

        try {
            const response = await api.request<T>({ method, url, data })
            return response.data
        } catch (err: any) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const allErrors = Object.values(errors).flat() as string[];
                setError(allErrors);
            } else {
                setError([err.response?.data?.message || err.message]);
            }
            return null;
        } finally {
            setLoading(false)
        }
    }

    return { request, loading, error }
}
