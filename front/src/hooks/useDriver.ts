import { useState } from "react";
import { DriverService } from "../services/DriverService";
import type { UserResponse } from "../lib/types/user";

export function useDriver() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { update } = DriverService;

	/* Update driver with profile & user information hooks */
	async function updateDriver(
		formData: FormData
	): Promise<UserResponse | undefined> {
		setLoading(true);
		setError(null);

		try {
			const data = await update(formData);
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.response?.data?.message);
		} finally {
			setLoading(false);
		}
	}

	return {
		loading,
		error,
		updateDriver,
	};
}
