export type Cooperative = {
	id: number;
	name: string;
	logo: string;
	contact_phone: string;
	contact_email: string;
	status: "pending" | "approved" | "suspended";
	user_id: number;
	created_at?: string;
	updated_at?: string;
};
