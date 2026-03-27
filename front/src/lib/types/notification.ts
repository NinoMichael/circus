export type Notification = {
	id: number;
	title: string;
	message: string;
	data?: Record<string, unknown>;
	read_at: string | null;
	created_at: string;
	updated_at: string;
};

export type NotificationsResponse = {
	notifications: Notification[];
	meta: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
		unread_count: number;
	};
};
