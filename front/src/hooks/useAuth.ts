import { useEffect, useState } from "react";
import type { LoginForm, LoginResponse } from "../lib/types/auth";
import type { RegisterForm } from "../lib/types/auth";
import type { User } from "../lib/types/user";
import { AuthService } from "../services/AuthService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RegisterStore {
	form: Partial<RegisterForm>;
	setStep1: (
		data: Pick<
			RegisterForm,
			"email" | "phone" | "password" | "password_confirmation"
		>
	) => void;
	setStep2: (
		data: Pick<
			RegisterForm,
			| "firstname"
			| "lastname"
			| "birth_date"
			| "is_male"
			| "national_id"
			| "address"
		>
	) => void;
	reset: () => void;
}

export const useRegisterStore = create<RegisterStore>()(
	persist(
		(set) => ({
			form: {},
			setStep1: (data) =>
				set((state) => ({ form: { ...state.form, ...data } })),
			setStep2: (data) =>
				set((state) => ({ form: { ...state.form, ...data } })),
			reset: () => set({ form: {} }),
		}),
		{
			name: "register-store",
		}
	)
);

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [checking, setChecking] = useState(true);

	/* Login hooks */
	async function login(credentials: LoginForm): Promise<LoginResponse | null> {
		setLoading(true);
		setError(null);

		try {
			const data = await AuthService.login(credentials);
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.response?.data?.message);
			return null;
		} finally {
			setLoading(false);
		}
	}

	/* Logout hooks */
	async function logout(): Promise<void> {
		await AuthService.logout();

		document.cookie = "token=; path=/; max-age=0; secure; samesite=strict";
		document.cookie = "user=; path=/; max-age=0; secure; samesite=strict";

		setUser(null);
	}

	/* Register hooks*/
	async function register(data: RegisterForm): Promise<boolean> {
		setLoading(true);
		setError(null);
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await AuthService.register(data as any);
			useRegisterStore.getState().reset();
			return true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.response?.data?.message ?? "Une erreur est survenue.");
			return false;
		} finally {
			setLoading(false);
		}
	}

	/* Fetch logged user hooks */
	useEffect(() => {
		const userCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("user="));

		if (userCookie) {
			const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
			setUser(userData);
		}

		setChecking(false);
	}, []);

	const isLoggedIn = !!user;

	return {
		login,
		logout,
		register,
		user,
		setUser,
		isLoggedIn,
		loading,
		error,
		checking,
		setChecking,
	};
}
