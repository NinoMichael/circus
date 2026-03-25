import { useState, useCallback } from "react";
import { PerformanceService } from "../services/PerformanceService";
import type {
	PerformanceResponse,
	PerformanceParams,
} from "../lib/types/performance";

export function usePerformance() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { fetchDriverPerformance } = PerformanceService;

	const fetchPerformance = useCallback(
		async (
			driverId: number,
			params: PerformanceParams = {}
		): Promise<PerformanceResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchDriverPerformance(driverId, params);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.response?.data?.message || null);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return {
		loading,
		error,
		fetchPerformance,
	};
}
