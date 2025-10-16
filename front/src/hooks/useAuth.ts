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

    async function login(credentials: LoginForm): Promise<LoginResponse | null> {
        setLoading(true)
        setError(null)

        try {
            const data = await AuthService.login(credentials)
            return data
        } catch (err: any) {
            setError(err.response?.data?.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    async function register(form: RegisterForm): Promise<RegisterResponse | null> {
        setLoading(true)
        setError(null)

        try {
            const data = await AuthService.register(form)
            return data
        } catch (err: any) {
            setError(err.response?.data?.message)
            return null
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

