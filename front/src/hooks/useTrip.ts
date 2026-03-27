import { useState, useCallback } from "react";
import { TripService } from "../services/TripService";
import type { Trip, TripParams, TripsResponse, BoardingResponse } from "../lib/types/trip";

export function useTrip() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { fetchByDriver, fetchById, fetchBoarding, startTrip } = TripService;

	const fetchTripsByDriver = useCallback(
		async (
			driverId: number,
			params: TripParams = {}
		): Promise<TripsResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchByDriver(driverId, params);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.data?.message || null);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const fetchTripById = useCallback(
		async (driverId: number, tripId: number): Promise<Trip | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchById(driverId, tripId);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.data?.message || null);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const fetchBoardingData = useCallback(
		async (driverId: number, tripId: number): Promise<BoardingResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchBoarding(driverId, tripId);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.data?.message || null);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const startTripById = useCallback(
		async (tripId: number): Promise<{ message: string } | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await startTrip(tripId);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.data?.message || null);
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
		fetchTripsByDriver,
		fetchTripById,
		fetchBoardingData,
		startTripById,
	};
}
