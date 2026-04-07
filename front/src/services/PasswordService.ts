import type {
	ForgotPasswordForm,
	ForgotPasswordResponse,
	ResetPasswordForm,
	ResetPasswordResponse,
	ResendResetLinkForm,
	ResendResetLinkResponse,
} from "../lib/types/auth";
import { api } from "./api";

export const PasswordService = {
	forgotPassword: async (
		data: ForgotPasswordForm
	): Promise<ForgotPasswordResponse> => {
		const { data: response } = await api.post<ForgotPasswordResponse>(
			"/forgot-password",
			data
		);
		return response;
	},

	resetPassword: async (
		data: ResetPasswordForm
	): Promise<ResetPasswordResponse> => {
		const { data: response } = await api.post<ResetPasswordResponse>(
			"/reset-password",
			data
		);
		return response;
	},

	resendResetLink: async (
		data: ResendResetLinkForm
	): Promise<ResendResetLinkResponse> => {
		const { data: response } = await api.post<ResendResetLinkResponse>(
			"/resend-reset-link",
			data
		);
		return response;
	},
};