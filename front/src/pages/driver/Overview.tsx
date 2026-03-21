import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pageTransition } from "../../lib/utils/animation";
import { useAuth } from "../../hooks/useAuth";
import { useDashboard } from "../../hooks/useDashboard";
import type { KPIDriverResponse } from "../../lib/types/dashboard";
import { formatTripStatus } from "../../lib/utils/formatter";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import NoTrip from "../../components/inc/NoTrip";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RadioCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentsIcon from "@mui/icons-material/Payments";
import { formatTime } from "../../lib/utils/date";
import { getImageUrl } from "../../lib/utils/media";

const OverviewDriver = () => {
	const { user } = useAuth();
	const [kpi, setKpi] = useState<KPIDriverResponse | undefined>();
	const { fetchKpisDriver } = useDashboard();

	useEffect(() => {
		if (!user?.driver?.id) return;

		const loadKpi = async () => {
			const data = await fetchKpisDriver(user?.driver?.id ?? 0);
			if (data) {
				setKpi(data);
			}
		};

		loadKpi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.driver?.id]);

	return (
		<motion.div
			className="flex flex-col items-start gap-8 mb-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="flex flex-col xs:flex-row justify-between gap-6 xs:gap-4 xs:items-center w-full">
				<div className="space-y-2">
					<h1 className="text-2xl font-extrabold">Bonjour {user?.firstname}</h1>
					<p>Prete pour votre prochaine rotation ? Voici votre itinéraire</p>
				</div>
				<div className="text-start bg-white py-4 px-8 xs:p-4 rounded-lg space-y-2 xs:text-center">
					<p className="text-2xl font-extrabold">{kpi?.trips || 0}</p>
					<p className="uppercase text-xs text-gray-400 tracking-widest">
						trajets
					</p>
				</div>
			</div>

			{kpi?.next_trip == null ? (
				<section className="mt-6 w-full">
					<NoTrip />
				</section>
			) : (
				<section className="mt-4 w-full">
					<div className="flex flex-col xs:flex-row justify-between xs:items-center xs:gap-4">
						<h5 className="flex gap-2 items-center">
							<ExitToAppIcon className="size-7 text-primary" />
							<span className="text-xl font-bold">Prochain voyage</span>
						</h5>
						<Link
							to="/"
							className="ml-9 xs:ml-0 text-sm xs:text-base text-primary hover:text-primary/90 underline underline-offset-2 hover:underline-offset-4 transition-all"
						>
							Voir détails
						</Link>
					</div>

					<div className="mt-6 bg-white rounded-2xl shadow grid sm:grid-cols-3 gap-6">
						<div className="sm:col-span-1">
							{!kpi?.next_trip.route?.departure_station?.image_cover ? (
								<div className="bg-gray-200 h-52 sm:h-full flex justify-center items-center">
									<p className="text-sm opacity-60">Aucune image disponible</p>
								</div>
							) : (
								<div className="relative h-52 sm:h-full">
									<img
										className="h-52 sm:h-full"
										src={getImageUrl(
											kpi?.next_trip.route?.departure_station?.image_cover
										)}
										alt="Station image cover"
									/>
									<div className="absolute font-medium rounded-lg text-sm text-white bottom-8 left-6 bg-secondary/50 p-2 text-center">
										{kpi.next_trip.route.distance} Km
									</div>
								</div>
							)}
						</div>

						<div className="sm:col-span-2 p-8">
							<div className="flex flex-col xs:flex-row gap-4 xs:items-center justify-between">
								<h5 className="w-fit xs:w-auto bg-primary/20 text-primary uppercase rounded-full px-4 py-2 text-sm tracking-widest">
									trajet #{kpi?.next_trip.id}
								</h5>
								<p>
									<span className="font-medium text-sm">
										<RadioCheckedIcon className="size-4 text-green-600 mr-2" />
										Statut :{" "}
										{kpi?.next_trip.status
											? formatTripStatus[kpi.next_trip.status]
											: "Planifié"}
									</span>
								</p>
							</div>

							<div className="mt-10 flex gap-6">
								<div className="relative flex flex-col items-center justify-between">
									<div className="absolute top-0 bottom-8 w-0.25 bg-gray-300"></div>
									<MyLocationIcon className="size-4 text-primary bg-white z-10" />
									<LocationOnIcon className="size-4 bg-white z-10 mb-8" />
								</div>

								<div className="space-y-12">
									<div className="space-y-1">
										<h5 className="text-xs text-gray-500 uppercase tracking-widest">
											départ
										</h5>
										<span className="text-xl font-bold">
											{kpi?.next_trip.route?.departure_station?.city}
										</span>
									</div>

									<div className="space-y-1">
										<h5 className="text-xs text-gray-500 uppercase tracking-widest">
											arrivée
										</h5>
										<span className="text-xl font-bold">
											{kpi?.next_trip.route?.arrival_station?.city}
										</span>
									</div>
								</div>
							</div>

							<Divider className="my-8" />

							<div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-4 lg:items-center">
								<div className="flex flex-col xs:flex-row gap-6 xs:items-center">
									<div className="space-y-2">
										<h6 className="text-gray-500 font-semibold uppercase text-xs tracking-widest">
											départ prévu
										</h6>
										<span className="text-lg font-extrabold">
											<ScheduleIcon className="text-primary size-6 mr-2" />
											{formatTime(kpi?.next_trip.departure_time ?? "")}
										</span>
									</div>
									<div className="space-y-2">
										<h6 className="text-gray-500 font-semibold uppercase text-xs tracking-widest">
											passagers
										</h6>
										<span className="text-lg font-extrabold">
											<GroupsIcon className="text-primary size-6 mr-2" />2 /{" "}
											{kpi?.bus[0].capacity || 0}
										</span>
									</div>
								</div>

								<Button
									className="md:w-48! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
									endIcon={<ArrowForwardIcon />}
								>
									Démarrer le trajet
								</Button>
							</div>
						</div>
					</div>
				</section>
			)}

			<div className="w-full mt-8 bg-white p-8 rounded-lg shadow flex gap-8 items-center">
				<div className="p-4 bg-primary flex justify-center items-center rounded-lg">
					<PaymentsIcon className="size-4 xs:size-8" />
				</div>
				<div className="space-y-2">
					<h4 className="uppercase font-semibold text-xs text-gray-400 tracking-widest">
						Revenus de la semaine
					</h4>
					<span className="font-extrabold text-2xl">100 000 Ar</span>
				</div>
			</div>
		</motion.div>
	);
};

export default OverviewDriver;
