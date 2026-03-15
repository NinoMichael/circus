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

export interface RegisterForm {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	password: string;
	password_confirmation: string;
	birth_date: string;
	national_id: string;
	is_male: boolean;
	address: string;
	avatar?: string;
}

export interface RegisterResponse {
	success: boolean;
	message: string;
	user: User;
}

