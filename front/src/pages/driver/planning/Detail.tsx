import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, statusColors } from "../../../lib/utils/animation";
import { useAuth } from "../../../hooks/useAuth";
import { useTrip } from "../../../hooks/useTrip";
import { formatTime, formatDateLong } from "../../../lib/utils/date";
import { formatBusType, formatTripStatus } from "../../../lib/utils/formatter";
import { createTripMap } from "../../../lib/helpers/map";
import type { Trip } from "../../../lib/types/trip";
import type Map from "ol/Map";

import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DomainIcon from "@mui/icons-material/Domain";
import ScheduleIcon from "@mui/icons-material/Schedule";

const DetailPlanningDriver = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [trip, setTrip] = useState<Trip | null>(null);
	const { fetchTripById, loading } = useTrip();
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<Map | null>(null);

	useEffect(() => {
		if (!user?.driver?.id || !id) return;

		const loadTrip = async () => {
			const driverId = user.driver?.id;
			if (!driverId) return;
			const data = await fetchTripById(driverId, Number(id));
			if (data && typeof data === "object" && "trip" in data) {
				setTrip(data.trip as Trip);
			}
		};

		loadTrip();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.driver?.id, id]);

	useEffect(() => {
		if (
			!trip?.route?.departure_station ||
			!trip?.route?.arrival_station ||
			!mapRef.current
		)
			return;

		const departure = trip.route.departure_station;
		const arrival = trip.route.arrival_station;

		if (
			!departure.latitude ||
			!departure.longitude ||
			!arrival.latitude ||
			!arrival.longitude
		) {
			return;
		}

		if (mapInstanceRef.current) {
			mapInstanceRef.current.setTarget(undefined);
		}

		const timer = setTimeout(() => {
			mapInstanceRef.current = createTripMap("trip-map", {
				departure: {
					longitude: Number(departure.longitude),
					latitude: Number(departure.latitude),
				},
				arrival: {
					longitude: Number(arrival.longitude),
					latitude: Number(arrival.latitude),
				},
			});
		}, 100);

		return () => {
			clearTimeout(timer);
			if (mapInstanceRef.current) {
				mapInstanceRef.current.setTarget(undefined);
			}
		};
	}, [trip]);

	const handleGoBack = () => {
		navigate("/driver/planning");
	};

	if (loading || !trip) {
		return (
			<div className="flex justify-center items-center w-full h-64">
				<CircularProgress color="primary" />
			</div>
		);
	}

	const bookedPassengers =
		trip.bookings?.filter((b) => b.status === "confirmed").length || 0;
	const progress = trip.buse?.capacity
		? Math.round((bookedPassengers / trip.buse.capacity) * 100)
		: 0;

	return (
		<motion.div
			className="flex flex-col items-start gap-6 mb-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<IconButton onClick={handleGoBack}>
				<ArrowBackIcon />
			</IconButton>

			<div className="flex items-center gap-4">
				<div className="space-y-3">
					<h1 className="text-2xl font-extrabold">Detail de planning</h1>
					<div className="text-gray-500 text-sm flex gap-4 items-center">
						<Chip
							label={`ID: #${trip.id}`}
							className="bg-gray-200! text-gray-600 font-medium"
						/>
						Assigné le {formatDateLong(trip.created_at || "")} •{" "}
						{formatTime(trip.created_at || "")}
					</div>
				</div>
			</div>

			<div className="flex justify-between w-full gap-4 items-center">
				<h2 className="text-2xl font-bold">
					<span>{trip.route?.departure_station?.city || "-"}</span>
					<span className="text-primary text-5xl">→ </span>
					<span> {trip.route?.arrival_station?.city || "-"}</span>
				</h2>

				<span
					className={`px-3 xs:px-4 text-xs py-1.5 xs:py-2 font-medium rounded-full ${
						statusColors[trip.status]
					}`}
				>
					{formatTripStatus[trip.status] || "Planifié"}
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
				<div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
					<div className="flex items-center gap-4 mb-4">
						<div className="bg-primary/10 rounded-xl p-3">
							<ScheduleIcon className="text-primary" />
						</div>
						<div>
							<p className="text-xs text-gray-400 uppercase font-bold">
								Départ prévu
							</p>
							<p className="text-xl font-bold">
								{formatTime(trip.departure_time)}
							</p>
							<p className="text-sm text-gray-500">
								{trip.route?.departure_station?.name}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
					<div className="flex items-center gap-4 mb-4">
						<div className="bg-primary/10 rounded-xl p-3">
							<ScheduleIcon className="text-primary" />
						</div>
						<div>
							<p className="text-xs text-gray-400 uppercase font-bold">
								Arrivée prévu
							</p>
							<p className="text-xl font-bold">
								{formatTime(trip.arrival_time)}
							</p>
							<p className="text-sm text-gray-500">
								{trip.route?.arrival_station?.name}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
					<div className="flex items-center gap-4 mb-4">
						<div className="bg-primary/10 rounded-xl p-3">
							<DomainIcon className="text-primary" />
						</div>
						<div>
							<p className="text-xs text-gray-400 uppercase font-bold">
								Coopérative
							</p>
							<p className="text-xl font-bold">
								{trip.cooperative?.name || "N/A"}
							</p>
							<p className="text-sm text-gray-500">
								{formatBusType[trip.buse?.type] || "N/A"}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				id="trip-map"
				ref={mapRef}
				className="mt-8 w-full h-96 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white"
			/>

			<div className="w-full bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
				<h3 className="text-xl font-extrabold mb-2">
					Liste complète des passagers
				</h3>
				<p className="text-gray-500 text-sm mb-6">
					Verifiez la présence de chaque passager avant le départ (
					{bookedPassengers} au total)
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{trip.bookings?.map((booking) => (
						<div
							key={booking.id}
							className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
						>
							<div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-white font-bold">
								{booking.user?.firstname?.[0]}
								{booking.user?.lastname?.[0]}
							</div>
							<span className="font-medium text-gray-700">
								{booking.user?.firstname} {booking.user?.lastname}
							</span>
						</div>
					))}
				</div>

				{bookedPassengers > 0 && (
					<div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
						<div className="flex justify-between items-center mb-2">
							<span className="font-bold text-gray-700">
								Progression de l'embarquement
							</span>
							<span className="font-extrabold text-xl">{progress}%</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-3">
							<div
								className="bg-primary h-3 rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<p className="text-sm text-gray-500 mt-2">
							{bookedPassengers} passagers sur {trip.buse?.capacity || 0} sont
							déjà installés a bord.
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default DetailPlanningDriver;
