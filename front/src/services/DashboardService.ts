import type {
	KPIAboutResponse,
	KPIDriverResponse,
} from "../lib/types/dashboard";
import { api } from "./api";

export const DashboardService = {
	getKpisAbout: async (): Promise<KPIAboutResponse> => {
		const { data } = await api.get<KPIAboutResponse>("/dashboard/kpi/about");
		return data;
	},

	getKpisDriver: async (driverId: number): Promise<KPIDriverResponse> => {
		const { data } = await api.get<KPIDriverResponse>(
			`/driver/${driverId}/kpi`
		);
		return data;
	},
};
