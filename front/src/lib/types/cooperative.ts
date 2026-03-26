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

export interface RegisterCooperativeForm {
	name: string;
	logo?: string;
	contact_phone: string;
	contact_email: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	password: string;
	password_confirmation: string;
	birth_date: string;
	is_male: boolean;
	national_id: string;
	address: string;
	avatar?: string;
}

export interface RegisterCooperativeResponse {
	success: boolean;
	message: string;
	cooperative: Cooperative;
}

