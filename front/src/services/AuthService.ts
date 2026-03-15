import type {
	LoginForm,
	LoginResponse,
	RegisterForm,
	RegisterResponse,
} from "../lib/types/auth";
import { api } from "./api";

export const AuthService = {
	login: async (credentials: LoginForm): Promise<LoginResponse> => {
		const { data } = await api.post<LoginResponse>("/login", credentials);
		return data;
	},

	logout: async (): Promise<void> => {
		await api.post<void>("/logout");
	},
	register: async (formData: RegisterForm): Promise<RegisterResponse> => {
		const { data } = await api.post<RegisterResponse>(
			"/register",
			formData,
			{}
		);
		return data;
	},
};
