export type Contact = {
	id: number;
	name: string;
	phone: string;
	email: string;
	subject: string;
	message: string;
	created_at?: string;
	updated_at?: string;
};

export interface ContactForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface ContactResponse {
	message: string;
	contact: Contact;
}
