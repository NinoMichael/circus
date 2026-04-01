import type {
	LoginForm,
	LoginResponse,
	RegisterForm,
	RegisterResponse,
} from "../lib/types/auth";
import type { UserResponse } from "../lib/types/user";
import { api, apiFormData } from "./api";

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

	update: async (data: FormData): Promise<UserResponse> => {
		const response = await apiFormData.post<UserResponse>(
			`/visitor/update`,
			data,
			{
				headers: {
					"X-HTTP-Method-Override": "PUT",
				},
			}
		);
		return response.data;
	},
};
