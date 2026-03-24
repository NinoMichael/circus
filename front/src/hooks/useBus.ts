import { useState } from "react";
import { BusService } from "../services/BusService";
import type { Bus, BusResponse } from "../lib/types/bus";

export function useBus() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { fetchByDriverId, update } = BusService;

	/* Get specific bus hook */
	async function fetchByIdDriver(id: number): Promise<Bus | undefined> {
		setLoading(true);
		setError(null);

		try {
			const data = await fetchByDriverId(id);
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.response?.data?.message);
		} finally {
			setLoading(false);
		}
	}

	/* Update bus hooks */
	async function updateBus(
		id: number,
		formData: FormData
	): Promise<BusResponse | undefined> {
		setLoading(true);
		setError(null);

		try {
			const data = await update(id, formData);
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
		updateBus,
		fetchByIdDriver,
	};
}
