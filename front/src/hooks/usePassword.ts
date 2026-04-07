import { useState } from "react";
import type {
	ForgotPasswordForm,
	ResetPasswordForm,
	ResendResetLinkForm,
} from "../lib/types/auth";
import { PasswordService } from "../services/PasswordService";

export function usePassword() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	async function forgotPassword(data: ForgotPasswordForm): Promise<boolean> {
		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			const response = await PasswordService.forgotPassword(data);
			setSuccess(response.message);
			return true;
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || "Une erreur est survenue. Veuillez réessayer.";
			setError(errorMessage);
			return false;
		} finally {
			setLoading(false);
		}
	}

	async function resetPassword(data: ResetPasswordForm): Promise<boolean> {
		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			const response = await PasswordService.resetPassword(data);
			setSuccess(response.message);
			return true;
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || "Une erreur est survenue. Veuillez réessayer.";
			setError(errorMessage);
			return false;
		} finally {
			setLoading(false);
		}
	}

	async function resendResetLink(data: ResendResetLinkForm): Promise<boolean> {
		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			const response = await PasswordService.resendResetLink(data);
			setSuccess(response.message);
			return true;
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || "Une erreur est survenue. Veuillez réessayer.";
			setError(errorMessage);
			return false;
		} finally {
			setLoading(false);
		}
	}

	function clearMessages() {
		setError(null);
		setSuccess(null);
	}

	return {
		forgotPassword,
		resetPassword,
		resendResetLink,
		loading,
		error,
		success,
		clearMessages,
	};
}
