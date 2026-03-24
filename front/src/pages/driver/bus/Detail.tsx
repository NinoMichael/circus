import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatBusStatus, formatBusType } from "../../../lib/utils/formatter";
import { getImageUrl } from "../../../lib/utils/media";
import type { Bus } from "../../../lib/types/bus";
import { pageTransition } from "../../../lib/utils/animation";

import { useBus } from "../../../hooks/useBus";
import { useAuth } from "../../../hooks/useAuth";

import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckIcon from "@mui/icons-material/CheckCircle";

const DetailBusDriver = () => {
	const [bus, setBus] = useState<Bus>();

	const { user } = useAuth();
	const { fetchByIdDriver } = useBus();

	useEffect(() => {
		if (!user?.driver?.id) return;

		const loadBus = async () => {
			const data = await fetchByIdDriver(user?.driver?.id ?? 0);
			if (data) {
				setBus(data);
			}
		};

		loadBus();
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
			<div className="space-y-2">
				<h1 className="text-2xl font-extrabold">Mon véhicule</h1>
				<p>Gérez les informations de votre véhicule ici</p>
			</div>

			<div className="flex flex-col gap-12 w-full">
				<div className="relative rounded-xl h-96 shadow shadow-neutral-600/30">
					{!bus?.cover_image_path ? (
						<div className="bg-secondary/10 p-8 rounded-xl h-96 flex justify-center items-center mx-auto">
							<p>Aucune image disponible</p>
						</div>
					) : (
						<div className="relative">
							<img
								className="h-96 rounded-xl w-full object-cover"
								src={getImageUrl(bus.cover_image_path)}
								alt="Bus cover image"
							/>

							<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-black/5 rounded-b-xl"></div>
						</div>
					)}

					<div className="absolute bottom-8 right-8 left-8 flex flex-col xs:flex-row xs:justify-between gap-4 items-start xs:items-center">
						<div className="space-y-3">
							<div className="bg-primary py-2 px-4 font-bold rounded-full tracking-widest">
								<span className="uppercase text-xs">Véhicule</span>
							</div>
							{!bus?.cover_image_path ? (
								<h3 className="font-extrabold text-2xl capitalize">
									{formatBusType[bus?.type ?? "sprinter"]}
								</h3>
							) : (
								<h3 className="text-white font-extrabold text-2xl capitalize">
									{formatBusType[bus?.type ?? "sprinter"]}
								</h3>
							)}
						</div>

						<Link to="/driver/bus/edit">
							<Button
								className="md:w-48! text-accent! bg-secondary! text-sm! hover:bg-secondary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
								startIcon={<EditIcon />}
							>
								Modifier
							</Button>
						</Link>
					</div>
				</div>

				<div className="grid md:grid-cols-3 items-center gap-8">
					<div className="rounded-lg p-6 bg-white shadow flex gap-6 items-center">
						<div className="flex justify-center items-center bg-primary/20 p-2 rounded">
							<BadgeIcon className="text-primary!" />
						</div>
						<div className="space-y-2">
							<h5 className="text-sm text-text/60">Immatriculation</h5>
							<p className="uppercase font-extrabold text-2xl">
								{bus?.registration_number || "-"}
							</p>
						</div>
					</div>
					<div className="rounded-lg p-6 bg-white shadow flex gap-6 items-center">
						<div className="flex justify-center items-center bg-primary/20 p-2 rounded">
							<EditIcon className="text-primary!" />
						</div>
						<div className="space-y-2">
							<h5 className="text-sm text-text/60">Capacité totale</h5>
							<p className="font-extrabold text-2xl">{bus?.capacity || 0}</p>
						</div>
					</div>
					<div className="rounded-lg p-6 bg-white shadow flex gap-6 items-center">
						<div className="flex justify-center items-center bg-primary/20 p-2 rounded">
							<CheckIcon className="text-primary!" />
						</div>
						<div className="space-y-2">
							<h5 className="text-sm text-text/60">Statut actuel</h5>
							<p className="font-extrabold text-2xl">
								{bus?.status ? formatBusStatus[bus.status] : "-"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default DetailBusDriver;
