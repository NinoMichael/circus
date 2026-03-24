import type { Bus } from "./bus";
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
	sort_by?: "earliest" | "latest";
}

export type Trip = {
	id: number;
	route_id: number;
	route?: Route;
	cooperative_id: number;
	bus_id: number;
	buse: Bus;
	departure_time: string;
	arrival_time: string;
	fees: string;
	available_seats: number;
	status: "scheduled" | "active" | "completed" | "cancelled";
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
