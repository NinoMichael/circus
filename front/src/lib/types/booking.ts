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
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
};
