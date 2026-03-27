import type { NotificationsResponse } from "../lib/types/notification";
import { api } from "./api";

export const NotificationService = {
	fetchAll: async (
		page: number = 1,
		perPage: number = 10
	): Promise<NotificationsResponse> => {
		const response = await api.get<NotificationsResponse>("/notifications", {
			params: { page, per_page: perPage },
		});
		return response.data;
	},

	markAsRead: async (notificationId: number): Promise<{ message: string }> => {
		const response = await api.put<{ message: string }>(
			`/notifications/${notificationId}/read`
		);
		return response.data;
	},

	markAllAsRead: async (): Promise<{ message: string }> => {
		const response = await api.put<{ message: string }>(
			"/notifications/read-all"
		);
		return response.data;
	},

	delete: async (notificationId: number): Promise<{ message: string }> => {
		const response = await api.delete<{ message: string }>(
			`/notifications/${notificationId}`
		);
		return response.data;
	},
};
