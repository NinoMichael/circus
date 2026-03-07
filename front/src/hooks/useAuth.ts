import { useApi } from "./useApi"
import type { authService, LoginCredentials, AuthUser } from "../services/authService"
import { setCookie } from "../lib/helpers"

export function useAuth() {
    const { request, loading, error } = useApi<ReturnType<typeof authService.login> extends Promise<infer T> ? T : never>()

    async function login(credentials: LoginCredentials): Promise<AuthUser | null> {
        const data = await request("post", "/auth/login", credentials)

        if (data) {
            setCookie("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            return data.user
        }

        return null
    }

    return { login, loading, error }
}