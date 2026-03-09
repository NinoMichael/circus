import type { User } from "../types/user";

export interface LoginForm {
	email?: string;
	phone?: string;
	password: string;
}

export interface LoginResponse {
	message: string;
	token: string;
	user: User;
}
