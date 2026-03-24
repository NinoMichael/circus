import type { Bus, BusResponse } from "../lib/types/bus";
import { api, apiFormData } from "./api";

export const BusService = {
	fetchByDriverId: async (driverId: number): Promise<Bus> => {
		const response = await api.get<Bus>(`/bus/${driverId}/`);
		return response.data;
	},

	update: async (id: number, formData: FormData): Promise<BusResponse> => {
		const response = await apiFormData.post<BusResponse>(
			`/bus/update/${id}/`,
			formData
		);
		return response.data;
	},
};
