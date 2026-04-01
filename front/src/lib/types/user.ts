import type { Cooperative } from "./cooperative";
import type { Driver } from "./driver";
import type { Station } from "./station";

export type UserRole =
	| "passenger"
	| "driver"
	| "cooperative"
	| "manager"
	| "admin";

export type User = {
	id: number;
	firstname: string;
	lastname: string;
	fullname: string;
	email: string;
	role: "passenger" | "driver" | "cooperative" | "manager" | "admin";
	phone: string;
	is_active: boolean;
	archived_at: string | null;
	last_login_at: string;
	email_verified_at: string | null;
	profile: Profile;
	driver?: Driver;
	cooperative?: Cooperative;
	station?: Station;
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

export type UserResponse = {
	message: string;
	user: User;
};
