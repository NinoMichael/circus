export type Driver = {
	id: number;
	user_id: number;
	license_number: string;
	status: "active" | "suspended";
	firstname?: string;
	lastname?: string;
	phone?: string;
	email?: string;
	avatar?: string;
	created_at?: string;
	updated_at?: string;
};

export type DriverForm = {
	firstname?: string;
	lastname?: string;
	phone?: string;
	birth_date?: string;
	national_id?: string;
	email?: string;
	is_male?: boolean;
	address?: string;
	license_number: string;
};
