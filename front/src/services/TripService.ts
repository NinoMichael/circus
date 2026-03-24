import type { Trip, TripParams, TripsResponse } from "../lib/types/trip";
import { api } from "./api";

export const TripService = {
	fetchByDriver: async (
		driverId: number,
		params: TripParams = {}
	): Promise<TripsResponse> => {
		const response = await api.get<TripsResponse>(
			`/trips/driver/${driverId}/`,
			{
				params,
			}
		);
		return response.data;
	},

	fetchById: async (driverId: number, tripId: number): Promise<Trip> => {
		const response = await api.get<Trip>(
			`/trips/driver/${driverId}/trip/${tripId}`
		);
		return response.data;
	},
};
