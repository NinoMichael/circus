export type SessionData = {
	id: string;
	ip_address: string;
	user_agent: string;
	device_type: string;
	browser: string;
	os: string;
	country: string | null;
	city: string | null;
	last_activity: string;
	is_current: boolean;
};

export type SessionsResponse = {
	data: SessionData[];
};

export type SessionDestroyResponse = {
	message: string;
};
