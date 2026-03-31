import type { Booking } from "./booking";
import type { Bus } from "./bus";
import type { Cooperative } from "./cooperative";
import type { Station } from "./station";

export interface TripsResponse {
	trips: Trip[];
	meta: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
	};
}

export interface TripParams {
	page?: number;
	per_page?: number;
	type?: "upcoming" | "past" | "cancelled";
	sort_by?: "earliest" | "latest" | "price_low" | "price_high";
}

export interface TripSearchParams extends TripParams {
	departure?: string;
	arrival?: string;
	date?: string;
	min_price?: number;
	max_price?: number;
	departure_time?: "morning" | "afternoon" | "evening";
	cooperatives?: string;
	bus_types?: string;
}

export type Trip = {
	id: number;
	route_id: number;
	route?: Route;
	cooperative_id: number;
	cooperative?: Cooperative;
	bus_id: number;
	buse?: Bus;
	departure_time: string;
	arrival_time: string;
	fees: string;
	available_seats: number;
	status: "scheduled" | "active" | "completed" | "cancelled";
	bookings?: Booking[];
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
};

export type Route = {
	id: number;
	departure_station_id: number;
	departure_station?: Station;
	arrival_station_id: number;
	arrival_station?: Station;
	distance: string;
	estimated_duration: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
};

export type BusSeat = {
	id: number;
	bus_id: number;
	seat_number: string;
	seat_type: string;
	is_available: boolean;
	booking_id?: number;
	is_booked: boolean;
	booking_status?: string;
	passenger_name?: string;
	created_at?: string;
	updated_at?: string;
};

export interface Progress {
	booked_seats: number;
	total_capacity: number;
	percentage: number;
	remaining: number;
}

export interface BoardingResponse {
	trip: Trip;
	bus: Bus;
	cooperative?: Cooperative;
	progress: Progress;
	seats: BusSeat[];
	bookings: Booking[];
}
