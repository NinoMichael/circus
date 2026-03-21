import { useState } from "react";
import { DashboardService } from "../services/DashboardService";
import type {
	KPIAboutResponse,
	KPIDriverResponse,
} from "../lib/types/dashboard";

export const useDashboard = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { getKpisAbout, getKpisDriver } = DashboardService;

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

	/* Get KPIs for driver overview workspace hook */
	async function fetchKpisDriver(
		driverId: number
	): Promise<KPIDriverResponse | undefined> {
		setLoading(true);
		setError(null);

		try {
			const data = await getKpisDriver(driverId);
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
		fetchKpisDriver,
	};
};
