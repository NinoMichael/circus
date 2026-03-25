export type RevenueChartData = {
	day?: string;
	month?: string;
	year?: string;
	amount: number;
};

export type RevenueChart = {
	weekly: RevenueChartData[];
	monthly: RevenueChartData[];
	yearly: RevenueChartData[];
};

export type PerformanceResponse = {
	total_revenue: number;
	revenue_change: number;
	weekly_revenue: number;
	pending_amount: number;
	fill_rate: number;
	average_passengers: number;
	max_capacity: number;
	revenue_chart: RevenueChart;
};

export type PerformanceParams = {
	period?: "weekly" | "monthly" | "yearly";
};
