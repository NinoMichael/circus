import type { Trip } from "./trip";
import type { User } from "./user";

export type Booking = {
	id: number;
	user_id: number;
	user: User;
	trip_id: number;
	trip: Trip;
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
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
};
