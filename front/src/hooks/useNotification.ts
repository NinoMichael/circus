import { useState, useCallback } from "react";
import { NotificationService } from "../services/NotificationService";
import type { NotificationsResponse, AppNotification } from "../lib/types/notification";

export function useNotification() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [notifications, setNotifications] = useState<AppNotification[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);

	const fetchNotifications = useCallback(
		async (page: number = 1, perPage: number = 10) => {
			setLoading(true);
			setError(null);

			try {
				const data = await NotificationService.fetchAll(page, perPage);
				setNotifications(data.notifications);
				setUnreadCount(data.meta.unread_count);
				return data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err?.data?.message || null);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const markAsRead = useCallback(async (notificationId: number) => {
		setLoading(true);
		setError(null);

		try {
			await NotificationService.markAsRead(notificationId);
			setNotifications((prev) =>
				prev.map((n) =>
					n.id === notificationId ? { ...n, read_at: new Date().toISOString() } : n
				)
			);
			setUnreadCount((prev) => Math.max(0, prev - 1));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err?.data?.message || null);
		} finally {
			setLoading(false);
		}
	}, []);

	const markAllAsRead = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			await NotificationService.markAllAsRead();
			setNotifications((prev) =>
				prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
			);
			setUnreadCount(0);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err?.data?.message || null);
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteNotification = useCallback(async (notificationId: number) => {
		setLoading(true);
		setError(null);

		try {
			await NotificationService.delete(notificationId);
			const deleted = notifications.find((n) => n.id === notificationId);
			setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
			if (deleted && !deleted.read_at) {
				setUnreadCount((prev) => Math.max(0, prev - 1));
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err?.data?.message || null);
		} finally {
			setLoading(false);
		}
	}, [notifications]);

	return {
		loading,
		error,
		notifications,
		unreadCount,
		fetchNotifications,
		markAsRead,
		markAllAsRead,
		deleteNotification,
	};
}
