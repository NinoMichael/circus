import type {
	Booking,
	BookingParams,
	BookingsResponse,
} from "../lib/types/booking";
import { api } from "./api";

export const BookingService = {
	fetchUserBookings: async (
		params: BookingParams = {}
	): Promise<BookingsResponse> => {
		const response = await api.get<BookingsResponse>("/bookings", {
			params,
		});
		return response.data;
	},

	fetchById: async (bookingId: number): Promise<Booking> => {
		const response = await api.get<Booking>(`/bookings/${bookingId}`);
		const rawData = response.data as { data?: Booking };
		return rawData.data || (response.data as Booking);
	},

	cancel: async (
		bookingId: number
	): Promise<{ message: string; booking: Booking }> => {
		const response = await api.put<{ message: string; booking: Booking }>(
			`/bookings/${bookingId}/cancel`
		);
		return response.data;
	},
};
