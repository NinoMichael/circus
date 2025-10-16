import apiClient from "./apiClient"
import type { LoginData, RegisterData } from "../lib/types"

export const AuthService = {
    login: async(loginData: Partial<LoginData>): Promise<LoginData> => {
        const { data } = await apiClient.post("/login", loginData)
        return data 
    },

    register: async(registerData: Partial<RegisterData>): Promise<RegisterData> => {
        const { data } = await apiClient.post("/register", registerData)
        return data
    }
}