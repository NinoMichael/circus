import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../../lib/utils/animation";
import { useAuth } from "../../hooks/useAuth";
import { usePerformance } from "../../hooks/usePerformance";
import type { PerformanceResponse } from "../../lib/types/performance";
import { formatCurrency, getLabel } from "../../lib/helpers";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import CircularProgress from "@mui/material/CircularProgress";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PendingIcon from "@mui/icons-material/Pending";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

const AnalyticsDriver = () => {
	const { user } = useAuth();
	const { fetchPerformance, loading } = usePerformance();
	const [performanceData, setPerformanceData] =
		useState<PerformanceResponse | null>(null);
	const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">(
		"weekly"
	);

	useEffect(() => {
		const driverId = user?.driver?.id;
		if (!driverId) return;

		const loadPerformance = async () => {
			const data = await fetchPerformance(driverId, { period });
			if (data) {
				setPerformanceData(data);
			}
		};

		loadPerformance();
	}, [user?.driver?.id, period, fetchPerformance]);

	const chartData = performanceData?.revenue_chart[period] || [];

	const barChartData = {
		labels: chartData.map(getLabel),
		datasets: [
			{
				label: "Revenus",
				data: chartData.map((d) => d.amount),
				backgroundColor: "#FC0",
				borderRadius: 8,
				barThickness: 40,
			},
		],
	};

	const barChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (context: { raw: unknown }) => {
						return formatCurrency(context.raw as number);
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: "#94A3B8",
					font: {
						size: 10,
						weight: "bold" as const,
					},
				},
			},
			y: {
				grid: {
					color: "#F1F5F9",
				},
				ticks: {
					color: "#94A3B8",
					callback: (value: unknown) => formatCurrency(value as number),
				},
			},
		},
	};

	const doughnutData = {
		labels: ["Occupé", "Libre"],
		datasets: [
			{
				data: [
					performanceData?.fill_rate || 0,
					100 - (performanceData?.fill_rate || 0),
				],
				backgroundColor: ["#FC0", "#F1F5F9"],
				borderWidth: 0,
				cutout: "75%",
			},
		],
	};

	const doughnutOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (context: { label: string; raw: unknown }) => {
						return `${context.label}: ${context.raw}%`;
					},
				},
			},
		},
	};

	if (loading || !performanceData) {
		return (
			<div className="flex justify-center items-center w-full h-64">
				<CircularProgress color="primary" />
			</div>
		);
	}

	return (
		<motion.div
			className="flex flex-col items-start gap-6 mb-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="flex flex-col items-center gap-8 w-full">
				<div className="flex justify-between items-end w-full">
					<div className="flex flex-col items-start gap-1">
						<p className="text-3xl font-extrabold leading-9">Performance</p>
						<p className="text-gray-500 leading-6">
							Consultez ici vos performances globales de votre prestation.
						</p>
					</div>
				</div>

				<div className="grid w-full sm:grid-cols-3 gap-6 items-center">
					<div className="p-4 rounded-lg border border-slate-bg bg-white shadow-sm relative">
						<div className="flex justify-between items-start">
							<div className="flex p-2 items-start rounded-lg bg-primary/10">
								<AccountBalanceWalletIcon className="text-primary size-6" />
							</div>
						</div>
						<div className="mt-4 ml-2 flex flex-col items-start">
							<p className="text-slate text-sm font-medium leading-5">
								Revenus totaux générés
							</p>
						</div>
						<div className="ml-2 flex pb-4 items-end ">
							<p className="flex flex-col justify-center shrink-0 text-3xl font-bold leading-9">
								{formatCurrency(performanceData.total_revenue)}
							</p>
						</div>
					</div>

					<div className="p-4 rounded-lg border border-slate-bg bg-white shadow-sm relative">
						<div className="flex justify-between items-start">
							<div className="flex p-2 items-start rounded-lg bg-primary/10">
								<CalendarMonthIcon className="text-blue size-6" />
							</div>
						</div>
						<div className="mt-4 ml-2 flex flex-col items-start">
							<p className="text-slate text-sm font-medium leading-5">
								Revenus de la semaine
							</p>
						</div>
						<div className="ml-2 flex pb-4 items-end ">
							<p className="flex flex-col justify-center shrink-0 text-3xl font-bold leading-9">
								{formatCurrency(performanceData.weekly_revenue)}
							</p>
						</div>
					</div>

					<div className="p-4 rounded-lg border border-slate-bg bg-white shadow-sm relative">
						<div className="flex justify-between items-center">
							<div className="flex p-2 items-start rounded-lg bg-primary/10">
								<PendingIcon className="text-amber size-6" />
							</div>
							<div className="flex py-1 px-2 items-start rounded-full bg-slate-bg">
								<p className="text-slate-light text-xs font-bold">En attente</p>
							</div>
						</div>
						<div className="mt-4 ml-2 flex flex-col items-start">
							<p className="text-slate text-sm font-medium leading-5">
								Montant en attente
							</p>
						</div>
						<div className="ml-2 flex pb-4 items-end ">
							<p className="flex flex-col justify-center shrink-0 text-3xl font-bold leading-9">
								{formatCurrency(performanceData.pending_amount)}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-8 flex pt-4 pr-6 pb-6 pl-6 flex-col items-start gap-8 rounded-lg border border-slate-bg bg-white shadow-sm w-full">
					<div className="flex flex-col sm:flex-row max-sm:gap-6 sm:justify-between sm:items-center w-full">
						<div className="flex flex-col items-start w-fit">
							<p className="text-lg font-bold leading-8">
								Évolution des revenus
							</p>
							<p className="text-slate text-sm leading-5">
								Analyse de vos gains sur la période sélectionnée
							</p>
						</div>
						<div className="flex items-start w-full sm:w-fit">
							<div className="flex p-1 items-start rounded-lg bg-slate-bg w-full sm:w-fit">
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										setPeriod("monthly");
									}}
									className={`cursor-pointer text-nowrap flex py-2 px-4 flex-col justify-center items-center rounded-md w-full sm:w-fit ${
										period === "weekly" ? "bg-white shadow-sm" : ""
									}`}
								>
									<p
										className={`flex flex-col justify-center text-xs font-bold leading-4 text-center ${
											period === "weekly"
												? "text-text"
												: "text-slate font-medium"
										}`}
									>
										Hebdomadaire
									</p>
								</button>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										setPeriod("monthly");
									}}
									className={`cursor-pointer text-nowrap flex py-2 px-4 flex-col justify-center items-center rounded-md w-full sm:w-fit ${
										period === "monthly" ? "bg-white shadow-sm" : ""
									}`}
								>
									<p
										className={`flex flex-col justify-center text-xs font-bold leading-4 text-center ${
											period === "monthly"
												? "text-text"
												: "text-slate font-medium"
										}`}
									>
										Mensuel
									</p>
								</button>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										setPeriod("monthly");
									}}
									className={`cursor-pointer text-nowrap flex py-2 px-4 flex-col justify-center items-center rounded-md w-full sm:w-fit ${
										period === "yearly" ? "bg-white shadow-sm" : ""
									}`}
								>
									<p
										className={`flex flex-col justify-center text-xs font-bold leading-4 text-center ${
											period === "yearly"
												? "text-text"
												: "text-slate font-medium"
										}`}
									>
										Annuel
									</p>
								</button>
							</div>
						</div>
					</div>
					<div className="flex py-0 px-4 items-end gap-3 w-full min-h-112">
						<Bar data={barChartData} options={barChartOptions} />
					</div>
				</div>

				<div className="flex p-6 flex-col items-start gap-8 rounded-xl border border-slate-bg bg-white shadow-sm w-full">
					<div className="flex justify-between items-center w-full">
						<div className="flex flex-col items-start w-fit">
							<p className="text-lg font-bold leading-7">Taux de remplissage</p>
							<p className="text-slate text-sm leading-5">
								Occupation moyenne du véhicule
							</p>
						</div>
					</div>
					<div className="flex p-4 justify-center items-center w-full">
						<div className="flex justify-center items-center w-48 h-48 relative">
							<div className="shrink-0 w-48 h-48 overflow-hidden relative">
								<Doughnut data={doughnutData} options={doughnutOptions} />
							</div>
							<div className="flex flex-col justify-center items-center absolute w-48 h-48">
								<div className="flex flex-col items-center w-fit">
									<p className="text-4xl font-black leading-10 text-center">
										{performanceData.fill_rate}%
									</p>
								</div>
								<div className="flex flex-col items-center w-fit">
									<p className="text-slate-light text-xs font-bold leading-4 text-center">
										Capacité
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col xs:flex-row xs:justify-center xs:items-start gap-4 w-full">
						<div className="flex p-4 flex-col items-start gap-1 rounded-lg border border-slate-bg bg-secondary text-white w-full h-full">
							<div className="flex flex-col items-start w-full">
								<p className="text-slate-light text-xs font-bold leading-4 w-full">
									Passagers moyenne
								</p>
							</div>
							<div className="flex flex-col items-start w-full">
								<p className="text-lg font-bold leading-7 w-full">
									{performanceData.average_passengers}
								</p>
							</div>
						</div>
						<div className="flex p-4 flex-col items-start gap-1 rounded-lg border border-slate-bg bg-secondary text-white w-full h-full">
							<div className="flex flex-col items-start w-full">
								<p className="text-slate-light text-xs font-bold leading-4 w-full">
									Capacité maximum
								</p>
							</div>
							<div className="flex flex-col items-start w-full">
								<p className="text-lg font-bold leading-7 w-full">
									{performanceData.max_capacity}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default AnalyticsDriver;
