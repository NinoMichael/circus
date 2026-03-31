import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../../lib/utils/animation";
import { useTrip } from "../../../hooks/useTrip";
import { useStation } from "../../../hooks/useStation";
import type { Trip } from "../../../lib/types/trip";
import { extractDate, formatTime } from "../../../lib/utils/date";
import { formatCurrency } from "../../../lib/helpers";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import FlagIcon from "@mui/icons-material/FlagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import SortIcon from "@mui/icons-material/SortOutlined";
import TuneIcon from "@mui/icons-material/TuneOutlined";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttleOutlined";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBusOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShippingOutlined";
import BrightnessIcon from "@mui/icons-material/Brightness1";
import { formatBusType } from "../../../lib/utils/formatter";

const BUS_TYPES = [
	{ id: "sprinter", label: "Sprinter", icon: AirportShuttleIcon },
	{ id: "mazda", label: "Mazda", icon: DirectionsBusIcon },
	{ id: "truck", label: "Camion", icon: LocalShippingIcon },
];

const ListTripVisitor = () => {
	const { loading, error, fetchPublicTrips, searchTrips } = useTrip();
	const { fetchCities } = useStation();
	const [searchParams] = useSearchParams();

	const [trips, setTrips] = useState<Trip[]>([]);
	const [meta, setMeta] = useState({
		current_page: 1,
		last_page: 1,
		per_page: 10,
		total: 0,
	});

	const [cities, setCities] = useState<string[]>([]);

	const [tabValue, setTabValue] = useState(0);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState<string>("earliest");

	const [selectedDeparture, setSelectedDeparture] = useState<string>(
		searchParams.get("departure") || ""
	);
	const [selectedArrival, setSelectedArrival] = useState<string>(
		searchParams.get("arrival") || ""
	);
	const [selectedDate, setSelectedDate] = useState<string>(
		searchParams.get("date") || ""
	);

	const loadCities = useCallback(async () => {
		const data = await fetchCities();
		if (data) {
			setCities(data);
		}
	}, [fetchCities]);

	const [searchDialog, setSearchDialog] = useState(false);
	const [filterDialog, setFilterDialog] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const [priceRange, setPriceRange] = useState<number[]>([10000, 150000]);
	const [departureTimeFilters, setDepartureTimeFilters] = useState<string[]>(
		[]
	);
	const [selectedCooperatives, setSelectedCooperatives] = useState<string[]>(
		[]
	);
	const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>([]);

	const hasUrlParams =
		searchParams.get("departure") ||
		searchParams.get("arrival") ||
		searchParams.get("date");
	const [searchApplied, setSearchApplied] = useState(Boolean(hasUrlParams));

	const loadTrips = useCallback(async () => {
		const tabTypes = ["upcoming", "past", "cancelled"];
		const type = tabTypes[tabValue];

		const hasSearchFilters =
			selectedDeparture ||
			selectedArrival ||
			selectedDate ||
			priceRange[0] > 10000 ||
			priceRange[1] < 150000 ||
			departureTimeFilters.length > 0 ||
			selectedCooperatives.length > 0 ||
			selectedBusTypes.length > 0;

		const shouldSearch = searchApplied && hasSearchFilters;

		if (shouldSearch) {
			const data = await searchTrips({
				page,
				per_page: 10,
				type: type as "upcoming" | "past" | "cancelled",
				sort_by: sortBy as "earliest" | "latest" | "price_low" | "price_high",
				departure: selectedDeparture || undefined,
				arrival: selectedArrival || undefined,
				date: selectedDate || undefined,
				min_price: priceRange[0] > 10000 ? priceRange[0] : undefined,
				max_price: priceRange[1] < 150000 ? priceRange[1] : undefined,
				departure_time: departureTimeFilters[0] as
					| "morning"
					| "afternoon"
					| "evening"
					| undefined,
				cooperatives:
					selectedCooperatives.length > 0
						? selectedCooperatives.join(",")
						: undefined,
				bus_types:
					selectedBusTypes.length > 0 ? selectedBusTypes.join(",") : undefined,
			});

			if (data) {
				setTrips(data.trips);
				setMeta(data.meta);
			}
		} else {
			const data = await fetchPublicTrips({
				page,
				per_page: 10,
				type: type as "upcoming" | "past" | "cancelled",
				sort_by: sortBy as "earliest" | "latest",
			});

			if (data) {
				setTrips(data.trips);
				setMeta(data.meta);
			}
		}
	}, [
		page,
		tabValue,
		sortBy,
		selectedDeparture,
		selectedArrival,
		selectedDate,
		priceRange,
		departureTimeFilters,
		selectedCooperatives,
		selectedBusTypes,
		searchApplied,
		fetchPublicTrips,
		searchTrips,
	]);

	useEffect(() => {
		loadCities();
	}, [loadCities]);

	useEffect(() => {
		loadTrips();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, tabValue, sortBy]);

	const handleSearch = () => {
		setSearchApplied(true);
		setPage(1);
		setTabValue(0);
		setTimeout(() => loadTrips(), 0);
		setSearchDialog(false);
	};

	const handleApplyFilters = () => {
		setSearchApplied(true);
		setPage(1);
		setTimeout(() => loadTrips(), 0);
		setFilterDialog(false);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleSortSelect = (value: string) => {
		setSortBy(value);
		setAnchorEl(null);
	};

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handlePriceChange = (_: Event, newValue: number | number[]) => {
		setPriceRange(newValue as number[]);
	};

	const handleDepartureTimeChange = (time: string) => {
		setDepartureTimeFilters((prev) =>
			prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
		);
	};

	const handleBusTypeToggle = (type: string) => {
		setSelectedBusTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
		);
	};

	const handleResetFilters = () => {
		setSearchApplied(false);
		setPriceRange([10000, 150000]);
		setDepartureTimeFilters([]);
		setSelectedCooperatives([]);
		setSelectedBusTypes([]);
		setSelectedDeparture("");
		setSelectedArrival("");
		setSelectedDate("");
		setPage(1);
	};

	return (
		<motion.form
			className="w-full pt-2 pb-16 md:py-8 px-4 md:px-8 lg:px-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="hidden md:grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 items-end bg-white rounded-xl p-4 lg:p-6 shadow">
				<div>
					<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
						départ
					</label>
					<div className="relative mt-2 lg:mt-4">
						<LocationIcon className="z-20 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
						<Select
							value={selectedDeparture}
							onChange={(e) => setSelectedDeparture(e.target.value)}
							displayEmpty
							className="z-10 bg-gray-100 h-11! pl-10! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary!"
						>
							<MenuItem className="text-sm" value="">
								<span className="text-gray-400">Ville de départ</span>
							</MenuItem>
							{cities.map((city) => (
								<MenuItem key={city} className="text-sm" value={city}>
									{city}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>

				<div>
					<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
						arrivée
					</label>
					<div className="relative mt-2 lg:mt-4">
						<FlagIcon className="z-20 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
						<Select
							value={selectedArrival}
							onChange={(e) => setSelectedArrival(e.target.value)}
							displayEmpty
							className="z-10 bg-gray-100 h-11! pl-10! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary!"
						>
							<MenuItem className="text-sm" value="">
								<span className="text-gray-400">Ville d'arrivée</span>
							</MenuItem>
							{cities.map((city) => (
								<MenuItem key={city} className="text-sm" value={city}>
									{city}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>

				<div>
					<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
						Date de voyage
					</label>
					<div className="relative mt-2 lg:mt-4">
						<CalendarTodayOutlinedIcon className="z-20 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
						<input
							type="date"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
				</div>

				<div className="lg:col-span-1">
					<Button
						startIcon={<SearchIcon />}
						onClick={handleSearch}
						className="w-full h-11 bg-primary text-sm hover:bg-primary/80 px-6 py-3 rounded-md font-bold transition-all shadow-sm"
					>
						Rechercher
					</Button>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-6 lg:mt-12">
				<aside className="hidden lg:block lg:w-1/3 bg-white rounded-xl p-6 shadow">
					<h3 className="font-bold text-lg flex items-center">
						<TuneIcon className="text-primary size-6 mr-3" />
						Filtres
					</h3>

					<div className="mt-6">
						<label className="text-gray-400 tracking-widest text-xs font-medium uppercase">
							gamme de frais (ar)
						</label>
						<Slider
							value={priceRange}
							onChange={handlePriceChange}
							valueLabelDisplay="auto"
							step={5000}
							min={10000}
							max={150000}
							className="mt-4 font-jakarta"
						/>
						<p className="mt-2 flex justify-between items-center">
							<span className="opacity-90 font-medium bg-gray-200 py-2 px-3 rounded-full text-xs">
								{formatCurrency(priceRange[0])}
							</span>
							<span className="opacity-90 font-medium bg-gray-200 py-2 px-3 rounded-full text-xs">
								{formatCurrency(priceRange[1])}
							</span>
						</p>
					</div>

					<div className="mt-8">
						<label className="text-gray-400 tracking-widest text-xs font-medium uppercase">
							heure de départ
						</label>
						<FormGroup className="mt-2">
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={departureTimeFilters.includes("morning")}
										onChange={() => handleDepartureTimeChange("morning")}
									/>
								}
								label={
									<span className="text-sm opacity-80">Matin (00h - 12h)</span>
								}
							/>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={departureTimeFilters.includes("afternoon")}
										onChange={() => handleDepartureTimeChange("afternoon")}
									/>
								}
								label={
									<span className="text-sm opacity-80">
										Après-midi (12h - 18h)
									</span>
								}
							/>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={departureTimeFilters.includes("evening")}
										onChange={() => handleDepartureTimeChange("evening")}
									/>
								}
								label={
									<span className="text-sm opacity-80">Soir (18h - 24h)</span>
								}
							/>
						</FormGroup>
					</div>

					<div className="mt-8">
						<label className="text-gray-400 tracking-widest text-xs font-medium uppercase">
							types de véhicule
						</label>
						<div className="grid grid-cols-3 gap-3 mt-3">
							{BUS_TYPES.map((bus) => (
								<div
									key={bus.id}
									onClick={() => handleBusTypeToggle(bus.id)}
									className={`p-3 text-center rounded-lg cursor-pointer transition-all ${
										selectedBusTypes.includes(bus.id)
											? "bg-primary text-secondary"
											: "bg-gray-200 hover:scale-105 hover:duration-300"
									}`}
								>
									<bus.icon
										className={
											selectedBusTypes.includes(bus.id) ? "" : "opacity-70"
										}
									/>
									<p className="text-xs mt-1">{bus.label}</p>
								</div>
							))}
						</div>
					</div>

					<div className="mt-8">
						<Button
							onClick={handleResetFilters}
							className="w-full h-10 bg-accent text-sm hover:bg-accent/80 text-secondary font-bold transition-all"
						>
							Réinitialiser
						</Button>
					</div>
				</aside>

				<section className="flex-1 flex flex-col gap-6">
					<div className="flex justify-between items-center">
						<IconButton
							size="small"
							title="Filtres"
							className="lg:hidden"
							onClick={() => setFilterDialog(true)}
						>
							<TuneIcon className="text-primary size-8" />
						</IconButton>

						<IconButton
							size="small"
							title="Recherche"
							className="md:hidden"
							onClick={() => setSearchDialog(true)}
						>
							<SearchIcon className="size-8" />
						</IconButton>

						<div className="flex gap-2 items-center ml-auto">
							<IconButton size="small" title="Tri" onClick={handleMenuClick}>
								<SortIcon className="size-8" />
							</IconButton>
						</div>
					</div>

					<div className="bg-white rounded-xl p-4 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
						<p className="text-sm">
							{meta.total} résultat{meta.total !== 1 ? "s" : ""} trouvé
							{meta.total !== 1 ? "s" : ""}
						</p>
						<div className="flex flex-wrap gap-2">
							{selectedDeparture && (
								<span className="rounded-full text-xs bg-primary/20 px-3 py-1 text-secondary">
									{selectedDeparture} ✕
								</span>
							)}
							{selectedArrival && (
								<span className="rounded-full text-xs bg-primary/20 px-3 py-1 text-secondary">
									→ {selectedArrival} ✕
								</span>
							)}
							{selectedDate && (
								<span className="rounded-full text-xs bg-primary/20 px-3 py-1 text-secondary">
									{selectedDate} ✕
								</span>
							)}
						</div>
					</div>

					{loading ? (
						<div className="flex justify-center items-center h-64">
							<CircularProgress sx={{ color: "#FFCC00" }} />
						</div>
					) : error ? (
						<div className="flex justify-center items-center h-64 text-red-600">
							<p>Erreur: {error}</p>
						</div>
					) : trips.length === 0 ? (
						<div className="flex justify-center items-center h-64">
							<p className="text-gray-400">Aucun trajet disponible</p>
						</div>
					) : (
						<>
							<div className="flex flex-col gap-6">
								{trips.map((trip: Trip) => (
									<div
										key={trip.id}
										className="bg-white rounded-xl p-8 shadow grid md:grid-cols-4 items-center gap-8 hover:shadow-md transition-all"
									>
										<div className="md:col-span-1 text-center flex flex-col justify-center items-center gap-2">
											<div className="text-xl bg-gray-200 py-3 px-2 rounded-lg font-bold text-primary">
												<span className="py-2 px-4 bg-primary/20 rounded-md">
													{trip.cooperative?.name?.charAt(0) || "C"}
												</span>
											</div>
											<h4 className="font-extrabold text-xl">
												{trip.cooperative?.name || "Coopérative"}
											</h4>
											<span className="opacity-80">
												{trip.buse?.type
													? formatBusType[trip.buse.type]
													: "Sprinter"}
											</span>
										</div>

										<div className="md:col-span-2 flex justify-center items-center gap-16 md:gap-8">
											<div className="text-center flex flex-col justify-center items-center gap-2">
												<span className="text-gray-500 text-sm">
													{extractDate(trip.departure_time).day}{" "}
													{extractDate(trip.departure_time).month}
												</span>
												<h3 className="font-bold text-2xl">
													{formatTime(trip.departure_time)}
												</h3>
												<span className="text-gray-500 text-sm">
													{trip.route?.departure_station?.city || "-"}
												</span>
											</div>
											<div className="hidden md:flex flex-col justify-center items-center gap-2">
												<span className="text-gray-500 text-sm">
													{trip.route?.estimated_duration}h
												</span>
												<div className="text-center relative flex justify-between gap-8 items-center">
													<BrightnessIcon className="size-3 z-20" />
													<DirectionsBusIcon className="z-20 size-10 opacity-70 bg-white p-2" />
													<BrightnessIcon className="z-20 size-3 text-primary" />
													<div className="z-10 h-[2px] bg-gray-300 w-full absolute top-[18px] inset-x-0"></div>
												</div>
												<span className="text-gray-500 text-sm text-center">
													{trip.route?.departure_station?.name ||
														"Gare Andohatapenaka"}
												</span>
											</div>
											<div className="text-center flex flex-col justify-center items-center gap-2">
												<span className="text-gray-500 text-sm">
													{extractDate(trip.arrival_time).day}{" "}
													{extractDate(trip.arrival_time).month}
												</span>
												<h3 className="font-bold text-2xl">
													{formatTime(trip.arrival_time)}
												</h3>
												<span className="text-gray-500 text-sm">
													{trip.route?.arrival_station?.city || "-"}
												</span>
											</div>
										</div>

										<div className="md:hidden flex flex-col justify-center items-center gap-2">
											<span className="text-gray-500 text-sm">
												{trip.route?.estimated_duration}h
											</span>
											<div className="text-center relative flex justify-between gap-16 items-center">
												<BrightnessIcon className="size-3 z-20" />
												<DirectionsBusIcon className="z-20 size-10 opacity-70 bg-white p-2" />
												<BrightnessIcon className="z-20 size-3 text-primary" />
												<div className="z-10 h-[2px] bg-gray-300 w-full absolute top-[18px] inset-x-0"></div>
											</div>
											<span className="text-gray-500 text-sm text-center">
												{trip.route?.departure_station?.name ||
													"Gare Andohatapenaka"}
											</span>
										</div>

										<div className="md:col-span-1 text-center flex flex-col justify-center items-center gap-2">
											<h5 className="text-2xl font-extrabold text-primary">
												{formatCurrency(Number(trip.fees))}
											</h5>
											<span className="bg-gray-200 text-sm rounded-full px-3 py-2 text-red-600/70 font-semibold">
												{trip.available_seats} places restantes
											</span>
											<Button className="w-full mt-8 md:mt-2 h-11 bg-primary text-sm hover:bg-primary/80 px-6 py-3 rounded-md font-bold transition-all shadow-sm">
												Détail
											</Button>
										</div>
									</div>
								))}
							</div>

							{meta.last_page > 1 && (
								<div className="flex justify-center mt-4">
									<Pagination
										count={meta.last_page}
										page={page}
										onChange={handlePageChange}
										color="primary"
										shape="rounded"
										size="small"
										siblingCount={0}
										boundaryCount={1}
									/>
								</div>
							)}
						</>
					)}
				</section>
			</div>

			<Dialog
				sx={{ "& .MuiDialog-paper": { width: "90%", maxHeight: "80%" } }}
				maxWidth="xs"
				open={filterDialog}
				onClose={() => setFilterDialog(false)}
			>
				<DialogTitle className="text-xl! text-secondary! font-bold!">
					Filtres
				</DialogTitle>
				<DialogContent className="grid gap-y-6">
					<div>
						<label className="text-gray-400 tracking-widest text-xs font-medium uppercase">
							gamme de frais (ar)
						</label>
						<Slider
							value={priceRange}
							onChange={handlePriceChange}
							valueLabelDisplay="auto"
							step={5000}
							min={10000}
							max={150000}
							className="mt-4 font-jakarta"
						/>
						<p className="mt-2 flex justify-between items-center">
							<span className="opacity-90 font-medium bg-gray-200 py-2 px-3 rounded-full text-xs">
								{formatCurrency(priceRange[0])}
							</span>
							<span className="opacity-90 font-medium bg-gray-200 py-2 px-3 rounded-full text-xs">
								{formatCurrency(priceRange[1])}
							</span>
						</p>
					</div>

					<div>
						<label className="text-gray-400 tracking-widest text-xs font-medium uppercase">
							heure de départ
						</label>
						<FormGroup className="mt-2">
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={departureTimeFilters.includes("morning")}
										onChange={() => handleDepartureTimeChange("morning")}
									/>
								}
								label={
									<span className="text-sm opacity-80">Matin (00h - 12h)</span>
								}
							/>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={departureTimeFilters.includes("afternoon")}
										onChange={() => handleDepartureTimeChange("afternoon")}
									/>
								}
								label={
									<span className="text-sm opacity-80">
										Après-midi (12h - 18h)
									</span>
								}
							/>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={departureTimeFilters.includes("evening")}
										onChange={() => handleDepartureTimeChange("evening")}
									/>
								}
								label={
									<span className="text-sm opacity-80">Soir (18h - 24h)</span>
								}
							/>
						</FormGroup>
					</div>

					<div>
						<label className="text-gray-400 tracking-widest text-xs font-medium uppercase">
							types de véhicule
						</label>
						<div className="grid grid-cols-3 gap-3 mt-3">
							{BUS_TYPES.map((bus) => (
								<div
									key={bus.id}
									onClick={() => handleBusTypeToggle(bus.id)}
									className={`p-3 text-center rounded-lg cursor-pointer transition-all ${
										selectedBusTypes.includes(bus.id)
											? "bg-primary text-secondary"
											: "bg-gray-200 hover:scale-105 hover:duration-300"
									}`}
								>
									<bus.icon
										className={
											selectedBusTypes.includes(bus.id) ? "" : "opacity-70"
										}
									/>
									<p className="text-xs mt-1">{bus.label}</p>
								</div>
							))}
						</div>
					</div>
				</DialogContent>
				<DialogActions className="!mt-4 !mb-2 !px-4">
					<Button
						className="bg-accent! w-full! text-sm! py-3! mr-2!"
						autoFocus
						onClick={handleResetFilters}
					>
						Réinitialiser
					</Button>
					<Button
						className="bg-primary! w-full! text-sm! py-3!"
						onClick={handleApplyFilters}
					>
						Appliquer
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				sx={{ "& .MuiDialog-paper": { width: "90%", maxHeight: "80%" } }}
				maxWidth="xs"
				open={searchDialog}
				onClose={() => setSearchDialog(false)}
			>
				<DialogTitle className="text-xl! text-secondary! font-bold!">
					Rechercher un trajet
				</DialogTitle>
				<DialogContent>
					<div className="grid gap-4 pt-2">
						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs">
								départ
							</label>
							<div className="relative mt-2">
								<LocationIcon className="z-20 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<Select
									value={selectedDeparture}
									onChange={(e) => setSelectedDeparture(e.target.value)}
									displayEmpty
									className="z-10 bg-gray-100 h-11! pl-10! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary!"
								>
									<MenuItem className="text-sm" value="">
										<span className="text-gray-400">Ville de départ</span>
									</MenuItem>
									{cities.map((city) => (
										<MenuItem key={city} className="text-sm" value={city}>
											{city}
										</MenuItem>
									))}
								</Select>
							</div>
						</div>

						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs">
								arrivée
							</label>
							<div className="relative mt-2">
								<FlagIcon className="z-20 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<Select
									value={selectedArrival}
									onChange={(e) => setSelectedArrival(e.target.value)}
									displayEmpty
									className="z-10 bg-gray-100 h-11! pl-10! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary!"
								>
									<MenuItem className="text-sm" value="">
										<span className="text-gray-400">Ville d'arrivée</span>
									</MenuItem>
									{cities.map((city) => (
										<MenuItem key={city} className="text-sm" value={city}>
											{city}
										</MenuItem>
									))}
								</Select>
							</div>
						</div>

						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs">
								Date de voyage
							</label>
							<div className="relative mt-2">
								<CalendarTodayOutlinedIcon className="z-20 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<input
									type="date"
									value={selectedDate}
									onChange={(e) => setSelectedDate(e.target.value)}
									className="w-full rounded-lg border border-gray-300 bg-gray-100 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
								/>
							</div>
						</div>
					</div>
				</DialogContent>
				<DialogActions className="!mt-4 !mb-2 !px-4">
					<Button
						className="bg-accent! w-full! text-sm! py-3! mr-2!"
						autoFocus
						onClick={() => setSearchDialog(false)}
					>
						Annuler
					</Button>
					<Button
						className="bg-primary! w-full! text-sm! py-3!"
						onClick={handleSearch}
					>
						Rechercher
					</Button>
				</DialogActions>
			</Dialog>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={() => handleSortSelect("earliest")}
				>
					Plus proche
				</MenuItem>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={() => handleSortSelect("latest")}
				>
					Plus lointain
				</MenuItem>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={() => handleSortSelect("price_low")}
				>
					Prix croissant
				</MenuItem>
				<MenuItem
					className="text-sm hover:text-primary"
					onClick={() => handleSortSelect("price_high")}
				>
					Prix décroissant
				</MenuItem>
			</Menu>
		</motion.form>
	);
};

export default ListTripVisitor;
