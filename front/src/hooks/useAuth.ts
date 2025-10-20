/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { AuthService } from '../services/authService'
import type { 
    LoginForm, 
    LoginResponse,
    RegisterForm,
    RegisterResponse 
} from '../lib/types/auth'

export default function useAuth() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function login(credentials: LoginForm): Promise<{ data?: LoginResponse, error?: string }> {
        setLoading(true)
        setError(null)

        try {
            const data = await AuthService.login(credentials)
            return { data }
        } catch (err: any) {
            const message = err.response?.data?.message || err.message
            setError(message)
            return { error: message }
        } finally {
            setLoading(false)
        }
    }

    async function register(form: RegisterForm): Promise<{ data?: RegisterResponse, error?: string }> {
        setLoading(true)
        setError(null)

        try {
            const data = await AuthService.register(form)
            return { data }
        } catch (err: any) {
            const message = err.response?.data?.message || err.message
            setError(message)
            return { error: message }
        } finally {
            setLoading(false)
        }
    }

    return { 
        login,
        register,
        loading,
        error 
    }
}

