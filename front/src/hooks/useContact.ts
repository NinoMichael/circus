import { useState } from "react";
import { contactService } from "../services/ContactService";
import type { ContactForm, ContactResponse } from "../lib/types/contact";

export function useContact() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { send } = contactService;

	/* Create new contact hook */
	async function createContact(
		contactData: ContactForm
	): Promise<ContactResponse | undefined> {
		setLoading(true);
		setError(null);

		try {
			const data = await send(contactData);
			return data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.response?.data?.message);
		} finally {
			setLoading(false);
		}
	}

	return {
		loading,
		error,
		createContact,
	};
}
