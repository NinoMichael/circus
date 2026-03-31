import { useState, useCallback } from "react";
import { StationService } from "../services/StationService";
import type { Station } from "../lib/types/station";

export function useStation() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchStations = useCallback(async (): Promise<Station[] | undefined> => {
		setLoading(true);
		setError(null);

		try {
			const data = await StationService.fetchAll();
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err?.data?.message || null);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchCities = useCallback(async (): Promise<string[] | undefined> => {
		setLoading(true);
		setError(null);

		try {
			const data = await StationService.fetchCities();
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err?.data?.message || null);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		loading,
		error,
		fetchStations,
		fetchCities,
	};
}