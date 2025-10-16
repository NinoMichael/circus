import api from "./api"
import type { 
    LoginForm, 
    LoginResponse,
    RegisterResponse, 
    RegisterForm 
} from "../lib/types/auth"

export const AuthService = {
    async login(data: LoginForm): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/login', data)
        return response.data
    },

    async register(data: RegisterForm): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>('/register', data)
        return response.data
    },
}