import type { LoginForm, LoginResponse } from "../lib/types/auth";
import { api } from "./api";

export const AuthService = {
	login: async (credentials: LoginForm): Promise<LoginResponse> => {
		const { data } = await api.post<LoginResponse>("/login", credentials);
		return data;
	},
};
