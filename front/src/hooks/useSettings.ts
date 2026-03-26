import { useState, useCallback } from "react";
import { SettingsService } from "../services/SettingsService";
import type { SettingsResponse, SettingGroupResponse } from "../lib/types/settings";

export function useSettings() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { getAll, getByGroup, updateGroup } = SettingsService;

	const fetchAll = useCallback(
		async (): Promise<SettingsResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await getAll();
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.response?.data?.message);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const fetchByGroup = useCallback(
		async (
			group: string
		): Promise<SettingGroupResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await getByGroup(group);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.response?.data?.message);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const update = useCallback(
		async (
			group: string,
			settings: Record<string, unknown>
		): Promise<SettingGroupResponse | undefined> => {
			setLoading(true);
			setError(null);

			try {
				const data = await updateGroup(group, settings);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.response?.data?.message);
			} finally {
				setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return {
		loading,
		error,
		fetchAll,
		fetchByGroup,
		update,
	};
}
