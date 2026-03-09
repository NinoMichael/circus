import { api } from './api';

export interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
    data: ContactData & { id: number };
}

export const contactService = {
    send: async (data: ContactData): Promise<ContactResponse> => {
        const response = await api.post<ContactResponse>('/contact', data);
        return response.data;
    },
};