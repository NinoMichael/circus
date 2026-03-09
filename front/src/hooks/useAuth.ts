import { useEffect, useState } from "react";
import type { LoginForm, LoginResponse } from "../lib/types/auth";
import type { User } from "../lib/types/user";
import { AuthService } from "../services/AuthService";

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
		user,
		setUser,
		isLoggedIn,
		loading,
		error,
		checking,
		setChecking,
	};
}
