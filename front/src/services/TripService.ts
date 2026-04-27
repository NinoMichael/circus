import type {
	Trip,
	TripParams,
	TripSearchParams,
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

	startTrip: async (tripId: number): Promise<{ message: string }> => {
		const response = await api.put<{ message: string }>(
			`/trips/${tripId}/start`,
			{}
		);
		return response.data;
	},

	fetchPublic: async (params: TripParams = {}): Promise<TripsResponse> => {
		const response = await api.get<TripsResponse>("/trips/", {
			params,
		});
		return response.data;
	},

	fetchSearch: async (
		params: TripSearchParams = {}
	): Promise<TripsResponse> => {
		const response = await api.get<TripsResponse>("/trips/search", {
			params,
		});
		return response.data;
	},

	fetchPublicById: async (tripId: number): Promise<Trip> => {
		const response = await api.get<Trip>(`/trips/${tripId}`);
		const rawData = response.data as { data?: Trip };
		return rawData.data || (response.data as Trip);
	},
};
