import type { BusSeat } from "../../lib/types/trip";

interface BusSeatsProps {
	seats: BusSeat[];
	onSeatClick?: (seat: BusSeat) => void;
}

const getSeatStyle = (seat: BusSeat): string => {
	if (!seat.is_booked) {
		return "border border-gray-300/40 bg-white text-text/60";
	}
	if (seat.booking_status === "confirmed") {
		return "bg-primary";
	}
	return "border-2 border-[rgba(255,204,0,0.20)] bg-gray-400";
};

const BusSeats = ({ seats, onSeatClick }: BusSeatsProps) => {
	if (!seats || !Array.isArray(seats) || seats.length === 0) {
		return (
			<div className="flex items-center justify-center w-full h-64 text-gray-400">
				Aucun siège disponible
			</div>
		);
	}

	const driverSeat = {
		id: "driver",
		seat_number: "CH",
		seat_type: "driver",
		is_booked: false,
	};
	const frontSeats = seats.filter((s) => s.seat_type === "front");
	const otherSeats = seats.filter(
		(s) => s.seat_type !== "front" && s.seat_type !== "driver"
	);

	return (
		<div className="flex flex-col items-center gap-6 w-full">
			<div className="w-full bg-accent rounded-[40px] border-4 border-gray-400/10 p-4">
				<div className="flex flex-col gap-6 mt-2">
					<div className="bg-gray-300 shadow rounded-t-xl h-12" />

					<div className="mt-8 flex justify-between gap-2 px-2">
						<button
							type="button"
							className="w-12 h-10 rounded-lg text-xs font-bold bg-secondary text-white flex items-center justify-center"
						>
							{driverSeat.seat_number}
						</button>

						{frontSeats.length > 0 && (
							<div className="flex justify-center gap-2">
								{frontSeats.map((seat) => (
									<button
										key={seat.id}
										type="button"
										onClick={() => onSeatClick?.(seat)}
										className={`
										w-12 h-10 rounded-lg text-xs font-bold transition-all
										${getSeatStyle(seat)}
										hover:shadow-md flex items-center justify-center
									`}
									>
										{seat.seat_number}
									</button>
								))}
							</div>
						)}
					</div>

					<div className="border-t border-gray-300/30 my-2" />

					<div className="grid grid-cols-4 gap-2 px-2">
						{otherSeats.map((seat) => (
							<button
								key={seat.id}
								type="button"
								onClick={() => onSeatClick?.(seat)}
								className={`
									w-full h-10 rounded-lg text-xs font-bold transition-all
									${getSeatStyle(seat)}
									hover:shadow-md flex items-center justify-center
								`}
							>
								{seat.seat_number}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusSeats;
