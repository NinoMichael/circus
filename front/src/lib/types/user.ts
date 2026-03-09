export type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	role: "passenger" | "driver" | "cooperative" | "manager" | "admin";
	phone: string;
	is_active: boolean;
	last_login_at: string;
	profile: Profile;
	created_at?: string;
	updated_at?: string;
};

export type Profile = {
	id: number;
	avatar?: string;
	birth_date: string;
	national_id: string;
	is_male: boolean;
	address: string;
	created_at?: string;
	updated_at?: string;
};
