import type { Bus } from "./bus";
import type { Cooperative } from "./cooperative";
import type { Trip } from "./trip";

export type KPIAboutResponse = {
	city_count: number;
	cooperative_count: number;
	cooperatives: Pick<Cooperative, "id" | "name" | "logo">[];
};

export type KPIDriverResponse = {
	trips: number;
	bus: Pick<Bus, "capacity">[];
	next_trip: Trip;
};
