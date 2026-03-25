import type { RegisterCooperativeForm, RegisterCooperativeResponse } from "../lib/types/cooperative";
import { api } from "./api";

export const CooperativeService = {
    registerCooperative: async (formData: RegisterCooperativeForm): Promise<RegisterCooperativeResponse> => {
        const { data } = await api.post<RegisterCooperativeResponse>(
            "/register-cooperative",
            formData,
            {}
        );
        return data;
    }
}