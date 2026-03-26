export type DriverNotificationSettings = {
	sms_alerts: boolean;
	email_reports: boolean;
	security_alerts: boolean;
};

export type DriverActivitySettings = {
	status: "active" | "suspended";
};

export type DriverPrivacySettings = {
	show_location: boolean;
	show_stats: boolean;
};

export type DriverSettings = {
	notifications: DriverNotificationSettings;
	activity: DriverActivitySettings;
	privacy: DriverPrivacySettings;
};

export type PassengerNotificationSettings = {
	trip_updates: boolean;
	promotions: boolean;
	newsletter: boolean;
};

export type PassengerPrivacySettings = {
	show_profile: boolean;
};

export type PassengerSettings = {
	notifications: PassengerNotificationSettings;
	privacy: PassengerPrivacySettings;
};

export type CooperativeNotificationSettings = {
	new_bookings: boolean;
	reports: boolean;
	alerts: boolean;
};

export type CooperativeBusinessSettings = {
	auto_confirm: boolean;
};

export type CooperativeSettings = {
	notifications: CooperativeNotificationSettings;
	business: CooperativeBusinessSettings;
};

export type ManagerNotificationSettings = {
	station_alerts: boolean;
	reports: boolean;
	staff_updates: boolean;
};

export type ManagerSettings = {
	notifications: ManagerNotificationSettings;
};

export type AdminNotificationSettings = {
	system_alerts: boolean;
	user_reports: boolean;
};

export type AdminSecuritySettings = {
	"2fa_enabled": boolean;
};

export type AdminSettings = {
	notifications: AdminNotificationSettings;
	security: AdminSecuritySettings;
};

export type UserSettings =
	| DriverSettings
	| PassengerSettings
	| CooperativeSettings
	| ManagerSettings
	| AdminSettings;

export type SettingsResponse = {
	data: Record<string, unknown>;
	message?: string;
};

export type SettingGroupResponse = {
	data: {
		group: string;
		settings: unknown;
	};
};

export interface UseSettingsReturn {
	loading: boolean;
	error: string | null;
	fetchAll: () => Promise<SettingsResponse | undefined>;
	fetchByGroup: (group: string) => Promise<SettingGroupResponse | undefined>;
	update: (
		group: string,
		settings: Record<string, unknown>
	) => Promise<SettingGroupResponse | undefined>;
}
