import type { ContactForm, ContactResponse } from "../lib/types/contact";
import { api } from "./api";

export const ContactService = {
	send: async (data: ContactForm): Promise<ContactResponse> => {
		const response = await api.post<ContactResponse>("/contact", data);
		return response.data;
	},
};
