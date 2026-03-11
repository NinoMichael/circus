export type Driver = {
	id: number;
	user_id: number;
	license_number: string;
	status: "active" | "suspended";
	created_at?: string;
	updated_at?: string;
};
