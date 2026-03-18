import type { Cooperative } from "./cooperative";

export type KPIAboutResponse = {
	city_count: number;
	cooperative_count: number;
	cooperatives: Pick<Cooperative, "id" | "name" | "logo">[];
};
