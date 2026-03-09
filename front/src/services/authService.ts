import { api } from "./api"

export interface LoginCredentials {
    email: string
    password: string
}

export interface UserProfile {
    id: number
    avatar: string | null
    birth_date: string | null
    national_id: string
    is_male: boolean
    address: string
}

export interface AuthUser {
    id: number
    email: string
    role: string
    contact: string
    is_active: boolean
    last_login_at: string
    email_verified_at: string
    created_at: string
    profile: UserProfile
}

export interface LoginResponse {
    message: string
    token: string
    user: AuthUser
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const { data } = await api.post<LoginResponse>("/auth/login", credentials)
        return data
    },
}