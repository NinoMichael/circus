import type { User } from "../types/index"

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    email: string;
    role: string;
    contact: string;
    password: string;
    confirm_password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterResponse {
    message: string;
    token: string;
    user: User;
}