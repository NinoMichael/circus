import type { Trip } from "./trip";
import type { User } from "./user";

export type BookingSeat = {
	id: number;
	booking_id: number;
	seat_id: number;
	busSeat?: {
		id: number;
		seat_number: string;
	};
	created_at?: string;
	updated_at?: string;
};

export type Payment = {
	id: number;
	booking_id: number;
	amount: string;
	payment_method: string;
	transaction_reference: string | null;
	paid_at: string;
	created_at?: string;
	updated_at?: string;
};

export type Booking = {
	id: number;
	user_id: number;
	user?: User;
	trip_id: number;
	trip?: Trip;
	nb_bookers: number;
	total_amount: string;
	is_missing: boolean;
	status:
		| "pending"
		| "confirmed"
		| "paid"
		| "cancelled"
		| "refunded"
		| "archived";
	bookingSeats?: BookingSeat[];
	payment?: Payment;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
};

export interface BookingsResponse {
	bookings: Booking[];
	meta: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
	};
}

export interface BookingParams {
	page?: number;
	per_page?: number;
	type?: "all" | "upcoming" | "past" | "cancelled" | "pending";
}
