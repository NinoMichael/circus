import { useState } from "react";
import { DashboardService } from "../services/DashboardService";
import type { KPIAboutResponse } from "../lib/types/dashboard";

export const useDashboard = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { getKpisAbout } = DashboardService;

	/* Get KPIs for about page hook */
	async function fetchKpisAbout(): Promise<KPIAboutResponse | undefined> {
		setLoading(true);
		setError(null);

		try {
			const data = await getKpisAbout();
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.response?.data?.message);
		} finally {
			setLoading(false);
		}

		return undefined;
	}

	return {
		error,
		loading,
		fetchKpisAbout,
	};
};
