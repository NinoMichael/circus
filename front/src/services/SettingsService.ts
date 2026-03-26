import { api } from "./api";
import type {
	SettingsResponse,
	SettingGroupResponse,
} from "../lib/types/settings";

export const SettingsService = {
	getAll: async (): Promise<SettingsResponse> => {
		const response = await api.get<SettingsResponse>("/settings");
		return response.data;
	},

	getByGroup: async (group: string): Promise<SettingGroupResponse> => {
		const response = await api.get<SettingGroupResponse>(`/settings/${group}`);
		return response.data;
	},

	updateGroup: async (
		group: string,
		settings: Record<string, unknown>
	): Promise<SettingGroupResponse> => {
		const response = await api.put<SettingGroupResponse>(`/settings/${group}`, {
			settings,
		});
		return response.data;
	},

	updateMultiple: async (
		settings: Record<string, unknown>
	): Promise<SettingsResponse> => {
		const response = await api.put<SettingsResponse>("/settings", {
			settings,
		});
		return response.data;
	},
};
