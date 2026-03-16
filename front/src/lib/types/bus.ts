import type { Driver } from "./driver";

export type Bus = {
	id: number;
	driver_id: number;
	driver: Driver;
	registration_number: string;
	type: "mazda" | "sprinter" | "truck";
	capacity: number;
	cover_image_path?: string;
	status: "active" | "maintenance" | "suspended";
	created_at?: string;
	updated_at?: string;
};
