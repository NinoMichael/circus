import type { Bus } from "../lib/types/bus";
import { api } from "./api";

export const BusService = {
	fetchByDriverId: async (driverId: number): Promise<Bus> => {
		const response = await api.get<Bus>(`/bus/${driverId}/`);
		return response.data;
	},
};
