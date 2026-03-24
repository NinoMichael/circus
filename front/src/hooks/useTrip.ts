import { useState, useCallback } from "react";
import { TripService } from "../services/TripService";
import type { TripParams, TripsResponse } from "../lib/types/trip";

export function useTrip() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchTripsByDriver = useCallback(
		async (
			driverId: number,
			params: TripParams = {}
		): Promise<TripsResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await TripService.fetchByDriver(driverId, params);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.data?.message || null);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return {
		loading,
		error,
		fetchTripsByDriver,
	};
}
