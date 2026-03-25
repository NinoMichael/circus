import type {
	PerformanceResponse,
	PerformanceParams,
} from "../lib/types/performance";
import { api } from "./api";

export const PerformanceService = {
	fetchDriverPerformance: async (
		driverId: number,
		params: PerformanceParams = {}
	): Promise<PerformanceResponse> => {
		const response = await api.get<PerformanceResponse>(
			`/driver/${driverId}/performance`,
			{ params }
		);
		return response.data;
	},
};
