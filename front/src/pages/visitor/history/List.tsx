import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../../../lib/utils/animation";
import { useBooking } from "../../../hooks/useBooking";
import type { Booking } from "../../../lib/types/booking";
import { formatDateLong, formatTime } from "../../../lib/utils/date";
import { formatCurrency } from "../../../lib/helpers";
import { getImageUrl } from "../../../lib/utils/media";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import AlarmIcon from "@mui/icons-material/AlarmOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import ReceiptIcon from "@mui/icons-material/ReceiptOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import HourglassIcon from "@mui/icons-material/HourglassEmptyOutlined";
import type {
	BookingCardProps,
	TabPanelProps,
} from "../../../lib/types/common";

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;
	return (
		<div hidden={value !== index} {...other}>
			{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
		</div>
	);
};

const formatBookingStatus = (status: Booking["status"]) => {
	switch (status) {
		case "pending":
			return {
				label: "En attente de paiement",
				color: "bg-red-800/20 text-red-800",
			};
		case "confirmed":
			return { label: "Confirmé", color: "bg-green-600/20 text-green-600" };
		case "paid":
			return { label: "Payé", color: "bg-blue-600/20 text-blue-600" };
		case "cancelled":
			return { label: "Annulé", color: "bg-gray-500/20 text-gray-500" };
		case "refunded":
			return { label: "Remboursé", color: "bg-orange-600/20 text-orange-600" };
		case "archived":
			return { label: "Archivé", color: "bg-gray-400/20 text-gray-400" };
		default:
			return { label: status, color: "bg-gray-500/20 text-gray-500" };
	}
};

const formatPaymentMethod = (method: string | undefined) => {
	if (!method) return "Non spécifié";
	switch (method.toLowerCase()) {
		case "mvola":
			return "Via Mvola";
		case "cash":
		case "espèces":
			return "En espèces";
		case "orange_money":
			return "Orange Money";
		case "airtel_money":
			return "Airtel Money";
		default:
			return method;
	}
};

const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
	const departureStation = booking.trip?.route?.departure_station;
	const arrivalStation = booking.trip?.route?.arrival_station;
	const statusInfo = formatBookingStatus(booking.status);
	const departureTime = booking.trip?.departure_time;
	const imageUrl = departureStation?.image_cover
		? getImageUrl(departureStation.image_cover)
		: "/src/assets/images/banner-home.jpg";

	const isUpcoming = departureTime && new Date(departureTime) > new Date();
	const canCancel =
		isUpcoming &&
		(booking.status === "pending" || booking.status === "confirmed");
	const canPay = booking.status === "pending";
	const canDownloadTicket =
		booking.status === "confirmed" || booking.status === "paid";
	const canViewPayment = booking.payment !== undefined;

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<div className="grid md:grid-cols-4 gap-6">
				<div className="col-span-1">
					<img
						src={imageUrl}
						className="w-full h-32 md:h-full rounded-lg object-cover"
						alt={`Station ${departureStation?.name || ""}`}
					/>
				</div>
				<div className="col-span-3 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
					<div className="flex-1">
						<span
							className={`uppercase tracking-widest text-xs py-2 px-3 rounded-full font-bold ${statusInfo.color}`}
						>
							{statusInfo.label}
						</span>
						<div className="flex gap-2 items-center mt-3">
							<span className="text-lg xs:text-xl font-bold">
								{departureStation?.city || "-"}
							</span>
							<span className="text-primary -mt-4 text-2xl xs:text-5xl">→</span>
							<span className="text-lg xs:text-xl font-bold">
								{arrivalStation?.city || "-"}
							</span>
						</div>
						<div className="mt-2 flex flex-wrap gap-4 md:gap-6 items-center">
							{departureTime && (
								<div className="opacity-80 flex items-center">
									<CalendarIcon className="size-4 font-light mr-2" />
									<span>{formatDateLong(departureTime)}</span>
								</div>
							)}
							{departureTime && (
								<div className="opacity-80 flex items-center">
									<AlarmIcon className="size-4 font-light mr-2" />
									<span>{formatTime(departureTime)}</span>
								</div>
							)}
						</div>
						{booking.trip?.cooperative && (
							<p className="mt-2 text-sm opacity-60">
								{booking.trip.cooperative.name}
							</p>
						)}
					</div>

					<div className="text-start md:text-end mt-4 md:mt-0">
						<h6 className="uppercase tracking-widest text-sm rounded-full font-bold text-gray-400">
							{canPay ? "montant à régler" : "montant payé"}
						</h6>
						<p className="mt-2 text-2xl font-extrabold">
							{formatCurrency(Number(booking.total_amount))}
						</p>
						{booking.payment && (
							<p className="mt-2 opacity-60">
								{formatPaymentMethod(booking.payment.payment_method)}
							</p>
						)}
					</div>
				</div>
			</div>

			<Divider className="my-6" />

			<div className="mt-2 flex flex-wrap justify-end gap-3 md:gap-6 items-center">
				{canViewPayment && (
					<Button
						className="text-sm! hover:bg-gray-200/80! px-4! md:px-6! py-2! md:py-3! rounded-md font-bold! transition-all! shadow-sm!"
						startIcon={<ReceiptIcon />}
					>
						Voir paiement
					</Button>
				)}
				{canDownloadTicket && (
					<Button
						className="text-sm! hover:bg-gray-200/80! px-4! md:px-6! py-2! md:py-3! rounded-md font-bold! transition-all! shadow-sm!"
						startIcon={<DownloadIcon />}
					>
						Billet PDF
					</Button>
				)}
				{canCancel && (
					<Button
						className="text-sm! text-red-600! hover:bg-red-50! px-4! md:px-6! py-2! md:py-3! rounded-md font-bold! transition-all! shadow-sm!"
						startIcon={<CancelIcon />}
						onClick={() => onCancel(booking.id)}
					>
						Annuler
					</Button>
				)}
				{(canPay || canDownloadTicket) && (
					<Button
						className="bg-primary! text-sm! hover:bg-primary/80! px-4! md:px-6! py-2! md:py-3! rounded-md font-bold! transition-all! shadow-sm!"
						startIcon={canPay ? <HourglassIcon /> : <CheckCircleIcon />}
					>
						{canPay ? "Payer maintenant" : "Voir détails"}
					</Button>
				)}
				{booking.status === "cancelled" && (
					<span className="text-sm text-gray-400 italic">
						Réservation annulée
					</span>
				)}
				{booking.status === "archived" && (
					<span className="text-sm text-gray-400 italic">
						Réservation archivée
					</span>
				)}
			</div>
		</div>
	);
};

const EmptyState = ({ message }: { message: string }) => (
	<div className="flex flex-col items-center justify-center py-16 text-center">
		<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
			<CalendarIcon className="size-12 text-gray-400" />
		</div>
		<p className="text-gray-500 text-lg">{message}</p>
	</div>
);

const ListHistoryVisitor = () => {
	const { loading, error, fetchBookings, cancelBooking } = useBooking();

	const [bookings, setBookings] = useState<Booking[]>([]);
	const [meta, setMeta] = useState({
		current_page: 1,
		last_page: 1,
		per_page: 10,
		total: 0,
	});

	const [tabValue, setTabValue] = useState(0);
	const [page, setPage] = useState(1);

	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);
	const [cancelLoading, setCancelLoading] = useState(false);

	const tabTypes = ["all", "upcoming", "past", "cancelled"];

	const loadBookings = useCallback(async () => {
		const type = tabTypes[tabValue];
		const data = await fetchBookings({
			page,
			per_page: 10,
			type: type as "all" | "upcoming" | "past" | "cancelled",
		});

		if (data) {
			setBookings(data.bookings);
			setMeta(data.meta);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, tabValue, fetchBookings]);

	useEffect(() => {
		loadBookings();
	}, [loadBookings]);

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		setPage(1);
	};

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleCancelClick = (bookingId: number) => {
		setBookingToCancel(bookingId);
		setCancelDialogOpen(true);
	};

	const handleConfirmCancel = async () => {
		if (!bookingToCancel) return;

		setCancelLoading(true);
		const result = await cancelBooking(bookingToCancel);
		setCancelLoading(false);

		if (result) {
			setCancelDialogOpen(false);
			setBookingToCancel(null);
			loadBookings();
		}
	};

	const getEmptyMessage = () => {
		switch (tabValue) {
			case 0:
				return "Vous n'avez pas encore de réservations";
			case 1:
				return "Vous n'avez pas de réservations à venir";
			case 2:
				return "Vous n'avez pas de réservations passées";
			case 3:
				return "Vous n'avez pas de réservations annulées";
			default:
				return "Aucune réservation";
		}
	};

	return (
		<motion.div
			className="min-h-screen py-12 px-8 lg:px-16"
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="space-y-2">
				<h1 className="text-3xl font-extrabold">Historique de réservations</h1>
				<span className="opacity-60">Retrouvez et gérez tous vos trajets</span>
			</div>

			<div className="mt-8 w-full overflow-x-auto">
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						minWidth: "max-content",
					}}
				>
					<Tabs value={tabValue} onChange={handleTabChange}>
						<Tab label="Toutes" />
						<Tab label="À venir" />
						<Tab label="Passées" />
						<Tab label="Annulés" />
					</Tabs>
				</Box>
			</div>

			<TabPanel value={tabValue} index={tabValue}>
				{meta.total > 0 && (
					<p className="text-sm text-gray-500 mb-4">
						{meta.total} réservation{meta.total !== 1 ? "s" : ""} trouvée
						{meta.total !== 1 ? "s" : ""}
					</p>
				)}

				{loading ? (
					<div className="flex justify-center items-center h-64">
						<CircularProgress sx={{ color: "#FFCC00" }} />
					</div>
				) : error ? (
					<div className="flex justify-center items-center h-64 text-red-600">
						<p>Erreur: {error}</p>
					</div>
				) : bookings.length === 0 ? (
					<EmptyState message={getEmptyMessage()} />
				) : (
					<>
						<div className="space-y-6">
							{bookings.map((booking: Booking) => (
								<BookingCard
									key={booking.id}
									booking={booking}
									onCancel={handleCancelClick}
								/>
							))}
						</div>

						{meta.last_page > 1 && (
							<div className="flex justify-center mt-8">
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
			</TabPanel>

			<Dialog
				open={cancelDialogOpen}
				onClose={() => setCancelDialogOpen(false)}
				aria-labelledby="cancel-dialog-title"
			>
				<DialogTitle id="cancel-dialog-title" className="text-xl! font-bold!">
					Annuler la réservation
				</DialogTitle>
				<DialogContent>
					<p className="text-gray-600">
						Êtes-vous sûr de vouloir annuler cette réservation ? Cette action
						est irréversible.
					</p>
				</DialogContent>
				<DialogActions className="!px-6! !pb-4!">
					<Button
						onClick={() => setCancelDialogOpen(false)}
						disabled={cancelLoading}
						className="text-sm! px-6! py-2!"
					>
						Non, conserver
					</Button>
					<Button
						onClick={handleConfirmCancel}
						disabled={cancelLoading}
						className="bg-red-600! text-white! text-sm! hover:bg-red-700! px-6! py-2!"
					>
						{cancelLoading ? (
							<CircularProgress size={20} className="text-white!" />
						) : (
							"Oui, annuler"
						)}
					</Button>
				</DialogActions>
			</Dialog>
		</motion.div>
	);
};

export default ListHistoryVisitor;
