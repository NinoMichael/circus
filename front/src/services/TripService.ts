import type {
	Trip,
	TripParams,
	TripsResponse,
	BoardingResponse,
} from "../lib/types/trip";
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
		const rawData = response.data as { data?: Trip };
		return rawData.data || (response.data as Trip);
	},

	fetchBoarding: async (
		driverId: number,
		tripId: number
	): Promise<BoardingResponse> => {
		const response = await api.get<BoardingResponse>(
			`/trips/driver/${driverId}/trip/${tripId}/boarding`
		);
		const rawData = response.data as { data?: BoardingResponse };
		return rawData.data || (response.data as BoardingResponse);
	},
};
