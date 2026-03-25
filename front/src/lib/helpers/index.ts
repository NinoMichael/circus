import type { RevenueChartData } from "../types/performance";

export const getCookie = (name: string): string | null => {
	const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
	return match ? decodeURIComponent(match[2]) : null;
};

export const setCookie = (name: string, value: string, days = 7) => {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(
		value
	)}; expires=${expires}; path=/`;
};

export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("fr-MG", {
		style: "currency",
		currency: "MGA",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

export const getLabel = (d: RevenueChartData): string => {
	return d.day || d.month || d.year || "";
};
