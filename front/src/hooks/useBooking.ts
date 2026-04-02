import { useState, useCallback } from "react";
import { BookingService } from "../services/BookingService";
import type {
	Booking,
	BookingParams,
	BookingsResponse,
} from "../lib/types/booking";

export function useBooking() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { fetchUserBookings, fetchById, cancel } = BookingService;

	const fetchBookings = useCallback(
		async (
			params: BookingParams = {}
		): Promise<BookingsResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchUserBookings(params);
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

	const fetchBookingById = useCallback(
		async (bookingId: number): Promise<Booking | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchById(bookingId);
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

	const cancelBooking = useCallback(
		async (bookingId: number): Promise<{ message: string } | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await cancel(bookingId);
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
		fetchBookings,
		fetchBookingById,
		cancelBooking,
	};
}
