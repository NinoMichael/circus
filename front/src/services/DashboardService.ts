import type { KPIAboutResponse } from "../lib/types/dashboard";
import { api } from "./api";

export const DashboardService = {
	getKpisAbout: async (): Promise<KPIAboutResponse> => {
		const { data } = await api.get<KPIAboutResponse>("/dashboard/kpi/about");
		return data;
	},
};
