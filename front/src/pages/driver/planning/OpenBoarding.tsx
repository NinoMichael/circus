import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../../lib/utils/animation";
import { useAuth } from "../../../hooks/useAuth";
import { useTrip } from "../../../hooks/useTrip";
import { formatTime, formatDateLong } from "../../../lib/utils/date";
import BusSeats from "../../../components/driver/BusSeats";
import type { BoardingResponse, BusSeat } from "../../../lib/types/trip";
import type { Booking, BookingSeat } from "../../../lib/types/booking";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RouteIcon from "@mui/icons-material/Route";

const statusColors: Record<string, string> = {
	confirmed: "bg-green-100 text-green-700",
	pending: "bg-yellow-100 text-yellow-700",
	cancelled: "bg-red-100 text-red-700",
};

const OpenBoardingDriver = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { fetchBoardingData, loading } = useTrip();
	const [boardingData, setBoardingData] = useState<BoardingResponse | null>(
		null
	);
	const [selectedSeat, setSelectedSeat] = useState<BusSeat | null>(null);

	useEffect(() => {
		if (!user?.driver?.id || !id) return;

		const loadBoarding = async () => {
			const driverId = user.driver?.id;
			if (!driverId) return;
			const data = await fetchBoardingData(driverId, Number(id));
			if (data) {
				setBoardingData(data);
			}
		};

		loadBoarding();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.driver?.id, id]);

	const handleGoBack = () => {
		navigate("/driver/planning");
	};

	const handleSeatClick = (seat: BusSeat) => {
		setSelectedSeat(seat);
	};

	if (loading || !boardingData) {
		return (
			<div className="flex justify-center items-center w-full h-64">
				<CircularProgress color="primary" />
			</div>
		);
	}

	const { trip, progress, seats, bookings } = boardingData;

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
				<div>
					<h1 className="text-3xl font-extrabold">Embarquement</h1>
					<div className="flex flex-col sm:flex-row items-center gap-3 mt-1 text-gray-500">
						<div className="flex gap-2 items-center">
							<p>
								<RouteIcon className="size-5 mr-2" />
								<span>{trip.route?.departure_station?.city}</span>
							</p>
							<p className="text-primary -mt-3 text-3xl">→ </p>
							<p>{trip.route?.arrival_station?.city}</p>
						</div>
						<span className="max-sm:hidden text-xl">•</span>
						<span className="max-sm:-ml-16 max-sm:text-sm">
							{formatDateLong(trip.departure_time)} à{" "}
							{formatTime(trip.departure_time)}
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
				<div className="lg:col-span-2 space-y-16">
					<div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
						<div className="flex justify-between items-center mb-2">
							<span className="font-bold text-gray-800">
								Progression de l'embarquement
							</span>
							<span className="font-bold text-primary text-xl">
								{progress.percentage}%
							</span>
						</div>
						<div className="w-full bg-gray-100 rounded-full h-3 mb-2">
							<div
								className="bg-primary h-3 rounded-full transition-all"
								style={{ width: `${progress.percentage}%` }}
							/>
						</div>
						<p className="text-sm text-gray-500">
							{progress.booked_seats} places occupées sur{" "}
							{progress.total_capacity}
						</p>
					</div>

					<div>
						<h2 className="text-lg font-bold mb-3">Liste des réservations</h2>
						<div className="space-y-3 max-h-[500px] overflow-y-auto">
							{bookings.map((booking: Booking) => (
								<div
									key={booking.id}
									className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
								>
									<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
										{booking.user?.firstname?.[0]}
										{booking.user?.lastname?.[0]}
									</div>
									<div className="flex-1">
										<p className="font-bold text-gray-800">
											{booking.user?.firstname} {booking.user?.lastname}
										</p>
										<div className="flex gap-3 text-sm text-gray-500">
											<span>{booking.user?.phone}</span>
											<span>•</span>
											<span>
												{booking.bookingSeats
													?.map((s: BookingSeat) => s.busSeat?.seat_number)
													.filter(Boolean)
													.join(", ")}
											</span>
										</div>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium ${
											statusColors[booking.status] ||
											"bg-gray-100 text-gray-700"
										}`}
									>
										{booking.status === "confirmed" ? "Présent" : "En attente"}
									</span>
								</div>
							))}
							{bookings.length === 0 && (
								<p className="text-gray-500 text-center py-8">
									Aucune réservation
								</p>
							)}
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
					<h3 className="text-center text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">
						Mise en place du bus
					</h3>

					<div className="flex justify-center">
						<BusSeats seats={seats} onSeatClick={handleSeatClick} />
					</div>

					<div className="mt-4 flex justify-center gap-4 text-xs">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-primary rounded" />
							<span>Réservé</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border border-gray-200 bg-white rounded" />
							<span>Libre</span>
						</div>
					</div>

					{selectedSeat && (
						<div className="mt-6 p-4 bg-gray-50 rounded-xl">
							<p className="font-bold text-gray-800 mb-2">
								Siège {selectedSeat.seat_number}
							</p>
							{selectedSeat.is_booked ? (
								<>
									<p className="text-sm text-gray-600">
										Passager: {selectedSeat.passenger_name || "N/A"}
									</p>
									<p className="text-sm">
										Status:{" "}
										<span
											className={
												selectedSeat.booking_status === "confirmed"
													? "text-green-600"
													: "text-yellow-600"
											}
										>
											{selectedSeat.booking_status === "confirmed"
												? "Confirmé"
												: "En attente"}
										</span>
									</p>
								</>
							) : (
								<p className="text-sm text-gray-500">Ce siège est disponible</p>
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default OpenBoardingDriver;
