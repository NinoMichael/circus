import type { UserResponse } from "../lib/types/user";
import { apiFormData } from "./api";

export const DriverService = {
	update: async (data: FormData): Promise<UserResponse> => {
		const response = await apiFormData.post<UserResponse>(
			`/driver/update`,
			data,
			{
				headers: {
					"X-HTTP-Method-Override": "PUT",
				},
			}
		);
		return response.data;
	},
};
