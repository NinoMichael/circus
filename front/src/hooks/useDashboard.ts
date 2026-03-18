import { useState, useEffect } from "react";
import { dashboardService } from "../services/DashboardService";

export const useDashboard = () => {
    const [citiesCount, setCitiesCount] = useState<number | null>(null);
    const [cooperativesCount, setCooperativesCount] = useState<number | null>(null);
    const [featuredCooperatives, setFeaturedCooperatives] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const cities = await dashboardService.getCitiesCount();
                const coops = await dashboardService.getCooperativesCount();
                const featured = await dashboardService.getFeaturedCooperatives();

                setCitiesCount(cities);
                setCooperativesCount(coops);
                setFeaturedCooperatives(featured);
            } catch (err: any) {
                setError(err.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return { citiesCount, cooperativesCount, featuredCooperatives, loading, error };
};