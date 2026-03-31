import type { Station } from "../lib/types/station";
import { api } from "./api";

export const StationService = {
	fetchAll: async (): Promise<Station[]> => {
		const response = await api.get<{ stations: Station[] }>("/stations/");
		const rawData = response.data as { data?: Station[] };
		if (rawData.data) return rawData.data;
		const data = response.data as { stations?: Station[] };
		return data.stations || [];
	},

	fetchCities: async (): Promise<string[]> => {
		const response = await api.get<{ cities: string[] }>("/stations/cities");
		const rawData = response.data as { data?: string[] };
		if (rawData.data) return rawData.data;
		const data = response.data as { cities?: string[] };
		return data.cities || [];
	},
};