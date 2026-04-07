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
	archived?: boolean;
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

export interface ForgotPasswordForm {
	email: string;
}

export interface ForgotPasswordResponse {
	message: string;
}

export interface ResetPasswordForm {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}

export interface ResetPasswordResponse {
	message: string;
}

export interface ResendResetLinkForm {
	email: string;
}

export interface ResendResetLinkResponse {
	message: string;
}

