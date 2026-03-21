import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { Bus } from "../../../lib/types/bus";
import { useBus } from "../../../hooks/useBus";
import { useAuth } from "../../../hooks/useAuth";
import { getImageUrl } from "../../../lib/utils/media";
import { formatBusStatus, formatBusType } from "../../../lib/utils/formatter";
import { pageTransition } from "../../../lib/utils/animation";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import InfoIcon from "@mui/icons-material/InfoOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditBusDriver = () => {
	const navigateTo = useNavigate();
	const [isDirty, setIsDirty] = useState(false);
	const [bus, setBus] = useState<Bus>();
	const [busEdit, setBusEdit] = useState({
		id: 0,
		type: "",
		registrationNumber: "",
		capacity: 0,
		status: "",
		coverImage: null as File | null,
		coverPreview: "" as string | null,
	});
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const { user } = useAuth();
	const { fetchByIdDriver, updateBus, error, loading } = useBus();

	useEffect(() => {
		if (!user?.driver?.id) return;

		const loadBus = async () => {
			const data = user.driver ? await fetchByIdDriver(user.driver.id) : null;
			if (data) {
				setBus(data);
				if (!isDirty) {
					setBusEdit({
						id: data.id || 0,
						type: data.type || "",
						registrationNumber: data.registration_number || "",
						capacity: data.capacity || 0,
						status: data.status || "",
						coverImage: null,
						coverPreview: null,
					});
				}
			}
		};

		loadBus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.driver?.id]);

	const handleImageChange = (file: File) => {
		const preview = URL.createObjectURL(file);

		setIsDirty(true);

		setBusEdit((prev) => ({
			...prev,
			coverImage: file,
			coverPreview: preview,
		}));
	};

	const handleSaveEdit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("_method", "PUT");
		formData.append("id", busEdit.id.toString());
		formData.append("driver_id", bus?.driver_id?.toString() || "");
		formData.append("type", busEdit.type);
		formData.append("registration_number", busEdit.registrationNumber);
		formData.append("capacity", busEdit.capacity.toString());
		formData.append("status", busEdit.status);
		if (busEdit.coverImage) {
			formData.append("cover_image_path", busEdit.coverImage);
		}

		if (bus) {
			const data = await updateBus(Number(bus.id), formData);

			if (data) {
				setToastMessage(data.message || "Modification réussie");
				setToastSeverity("success");
				setToastOpen(true);
				setTimeout(() => navigateTo("/driver/bus"), 2000);
			}

			if (error) {
				setToastMessage(error || "Une erreur est survenue");
				setToastSeverity("error");
				setToastOpen(true);
			}
		}
	};

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
				<h1 className="text-2xl font-extrabold">Modifier votre véhicule</h1>
				<p>
					Mettez à jour les informations de votre outil de travail principal
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-8 items-start w-full">
				<div className="md:col-span-1 bg-white p-8 rounded-lg">
					<h3 className="font-semibold pb-3 border-b border-gray-200">
						Aperçu du véhicule
					</h3>
					<div className="mt-6 relative">
						<img
							src={
								busEdit.coverPreview || getImageUrl(bus?.cover_image_path) || ""
							}
							className="h-52 w-full rounded object-cover"
							alt="Bus image"
						/>

						<div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 rounded">
							<button
								type="button"
								onClick={() =>
									document.getElementById("bus-image-upload")?.click()
								}
								className="cursor-pointer bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
							>
								<EditOutlinedIcon className="text-gray-700" />
							</button>
						</div>
					</div>
					<p className="mt-6 text-center text-gray-400 text-xs">
						Formats supportés : JPG, JPEG, PNG
					</p>
				</div>

				<form className="md:col-span-2" onSubmit={handleSaveEdit}>
					<input
						type="file"
						accept="image/*"
						className="hidden"
						id="bus-image-upload"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) handleImageChange(file);
						}}
					/>

					<div className="bg-white p-8 rounded-lg">
						<div className=" grid xs:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label className="block font-medium">Type de véhicule</label>
								<div className="relative">
									<Select
										className="h-11! px-1! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
										value={busEdit.type}
										onChange={(e) => {
											setIsDirty(true);
											setBusEdit((prev) => ({
												...prev,
												type: e.target.value,
											}));
										}}
									>
										{Object.entries(formatBusType).map(([key, label]) => (
											<MenuItem
												key={key}
												value={key}
												className="text-sm capitalize"
											>
												{label}
											</MenuItem>
										))}
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Immatriculation</label>
								<div className="relative">
									<input
										type="text"
										placeholder="TAF 1234"
										value={busEdit.registrationNumber}
										onChange={(e) => {
											setIsDirty(true);
											setBusEdit((prev) => ({
												...prev,
												registrationNumber: e.target.value,
											}));
										}}
										className="w-full uppercase rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Capacité siège</label>
								<div className="relative">
									<input
										type="text"
										placeholder="18"
										value={busEdit.capacity}
										onChange={(e) => {
											setIsDirty(true);
											setBusEdit((prev) => ({
												...prev,
												capacity: Number(e.target.value),
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Statut actuel</label>
								<div className="relative">
									<Select
										className="h-11! px-1! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
										value={busEdit.status}
										onChange={(e) => {
											setIsDirty(true);
											setBusEdit((prev) => ({
												...prev,
												status: e.target.value,
											}));
										}}
									>
										{Object.entries(formatBusStatus).map(([key, label]) => (
											<MenuItem key={key} value={key} className="text-sm">
												{label}
											</MenuItem>
										))}
									</Select>
								</div>
							</div>
						</div>

						<div className="mt-16 flex flex-col xs:flex-row justify-end gap-8">
							<Link to="/driver/bus">
								<Button className=" w-full! bg-accent text-sm! hover:bg-accent/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!">
									Annuler
								</Button>
							</Link>
							<Button
								type="submit"
								disabled={!isDirty}
								className=" bg-primary text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
							>
								{loading ? "Modification..." : "Enregistrer les modifications"}
							</Button>
						</div>
					</div>

					<div className="mt-8 xs:mt-16 text-blue-500 border text-sm border-blue-400/30 bg-blue-300/30 rounded-lg p-4 flex items-start gap-3">
						<InfoIcon className="font-bold! size-4!" />
						<div className="space-y-2 -mt-1">
							<h4 className="font-bold">Délai de validation</h4>
							<p>
								Certaines modifications ( comme l'Immatriculation ) nécessitent
								une validation par l'équipe Circus sous 24h
							</p>
						</div>
					</div>
				</form>
			</div>

			<Snackbar
				open={toastOpen}
				autoHideDuration={3000}
				onClose={() => setToastOpen(false)}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert
					onClose={() => setToastOpen(false)}
					severity={toastSeverity}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{toastMessage}
				</Alert>
			</Snackbar>
		</motion.div>
	);
};

export default EditBusDriver;
