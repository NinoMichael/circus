import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../../../lib/utils/animation";
import { useAuth } from "../../../hooks/useAuth";
import { useTrip } from "../../../hooks/useTrip";
import type { Trip } from "../../../lib/types/trip";
import { extractDate, formatTime } from "../../../lib/utils/date";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Pagination from "@mui/material/Pagination";
import NoTrip from "../../../components/inc/NoTrip";

import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupsIcon from "@mui/icons-material/Groups";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatTripStatus } from "../../../lib/utils/formatter";

const statusColors: Record<string, string> = {
	scheduled: "bg-[#f59e0b] text-white",
	active: "bg-green-600/70 text-white",
	completed: "bg-gray-400 text-white",
	cancelled: "bg-red-600/70 text-white",
};

const PlanningListDriver = () => {
	const { user } = useAuth();
	const [trips, setTrips] = useState<Trip[]>([]);
	const [tabValue, setTabValue] = useState(0);
	const [sortBy, setSortBy] = useState<string>("earliest");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { fetchTripsByDriver, loading } = useTrip();

	const tabTypes = ["upcoming", "past", "cancelled"];

	const loadTrips = async () => {
		if (!user?.driver?.id) return;

		const driverId = user.driver.id;
		const type = tabTypes[tabValue];

		const data = await fetchTripsByDriver(driverId, {
			page,
			per_page: 10,
			type: type as "upcoming" | "past" | "cancelled",
			sort_by: sortBy as "earliest" | "latest",
		});

		if (data) {
			setTrips(data.trips);
			setTotalPages(data.meta.last_page);
		}
	};

	useEffect(() => {
		loadTrips();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.driver?.id, tabValue, sortBy, page]);

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		setPage(1);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<motion.div
			className="flex flex-col items-start gap-6 mb-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="w-full flex flex-col xs:flex-row justify-between gap-4 items-start xs:items-center">
				<div className="space-y-2">
					<h1 className="text-2xl font-extrabold">Mes plannings</h1>
					<p className="text-gray-500">
						Gérez vos différents plannings de la journée
					</p>
				</div>

				<div className="w-full xs:w-40">
					<Select
						value={sortBy}
						className="text-sm w-full h-11 bg-white"
						onChange={(e) => setSortBy(e.target.value)}
					>
						<MenuItem className="text-sm" value="earliest">
							Plus proche
						</MenuItem>
						<MenuItem className="text-sm" value="latest">
							Plus lointain
						</MenuItem>
					</Select>
				</div>
			</div>

			<div className="w-full overflow-x-auto">
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						minWidth: "max-content",
					}}
				>
					<Tabs value={tabValue} onChange={handleTabChange}>
						<Tab label="À venir" />
						<Tab label="Passés" />
						<Tab label="Annulés" />
					</Tabs>
				</Box>
			</div>

			{loading ? (
				<div className="flex justify-center items-center w-full h-64">
					<CircularProgress color="primary" />
				</div>
			) : trips.length === 0 ? (
				<div className="w-full flex justify-center items-center mt-8 mx-auto">
					<NoTrip />
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 gap-4 w-full">
						{trips.map((trip: Trip) => (
							<div
								key={trip.id}
								className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-8 bg-white rounded-xl shadow-sm border border-gray-100 p-4 xs:p-6 hover:shadow-md transition-all"
							>
								<div className="flex flex-col sm:flex-row gap-6 items-center w-full">
									<div className="bg-primary rounded-lg p-2 xs:p-4 uppercase text-center">
										<span className="text-xl xs:text-2xl font-extrabold">
											{extractDate(trip.departure_time).day}
										</span>
										<br />
										<span className="text-xs xs:text-sm opacity-70">
											{extractDate(trip.departure_time).monthYear}
										</span>
									</div>

									<div className="flex-1 space-y-2 xs:space-y-3">
										<div className="flex flex-wrap items-center gap-2">
											<span className="text-base xs:text-lg font-bold">
												{trip.route?.departure_station?.city || "-"}
											</span>
											<span className="text-primary -mt-4 text-2xl xs:text-5xl">
												→
											</span>
											<span className="text-base xs:text-lg font-bold">
												{trip.route?.arrival_station?.city || "-"}
											</span>
										</div>

										<div className="flex justify-between sm:justify-start flex-wrap gap-x-4 gap-y-2 opacity-60 text-xs xs:text-sm">
											<div className="flex gap-1 items-center">
												<ScheduleIcon className="size-4" />
												<span>
													<span className="max-sm:hidden">Départ prévu: </span>
													{formatTime(trip.departure_time)}
												</span>
											</div>
											<div className="flex gap-1 items-center">
												<ScheduleIcon className="size-4" />
												<span>
													<span className="max-sm:hidden">Arrivée: </span>
													{formatTime(trip.arrival_time)}
												</span>
											</div>
											<div className="flex gap-1 items-center">
												<GroupsIcon className="size-4" />
												<span>
													<span className="max-sm:hidden">Passagers: </span>
													{`${trip.available_seats}/${
														trip.buse?.capacity || 0
													}`}
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-row max-sm:justify-between sm:flex-col gap-2 items-center sm:items-end max-sm:w-full">
									<span
										className={`px-3 xs:px-4 text-xs py-1.5 xs:py-2 font-medium rounded-full ${
											statusColors[trip.status]
										}`}
									>
										{formatTripStatus[trip.status] || "Planifié"}
									</span>

									<IconButton size="small" onClick={handleMenuClick}>
										<MoreVertIcon className="size-5" />
									</IconButton>
								</div>
							</div>
						))}
					</div>

					<div className="w-full flex justify-center mt-4 xs:mt-8">
						<Pagination
							count={totalPages}
							page={page}
							onChange={handlePageChange}
							color="primary"
							shape="rounded"
							size="small"
							siblingCount={0}
							boundaryCount={1}
						/>
					</div>
				</>
			)}

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={handleMenuClose}
				>
					Voir détails
				</MenuItem>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={handleMenuClose}
				>
					Modifier
				</MenuItem>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={handleMenuClose}
				>
					Annuler
				</MenuItem>
			</Menu>
		</motion.div>
	);
};

export default PlanningListDriver;
