import { api } from "./api";

export const dashboardService = {

    getCitiesCount: async () => {
        const { data } = await api.get("/dashboard/cities/count");
        return data;
    },

    getCooperativesCount: async () => {
        const { data } = await api.get("/dashboard/cooperatives/count");
        return data;
    },

    getFeaturedCooperatives: async () => {
        const { data } = await api.get("/dashboard/cooperatives/featured");
        return data;
    },
};