import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { useDriver } from "../../../hooks/useDriver";

import { getImageUrl } from "../../../lib/utils/media";
import { pageTransition } from "../../../lib/utils/animation";
import { formatDateForInput } from "../../../lib/utils/date";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedIcon from "@mui/icons-material/Verified";

const EditProfileDriver = () => {
	const navigateTo = useNavigate();
	const { user, setUser } = useAuth();
	const { updateDriver, error, loading } = useDriver();

	const [driverEdit, setDriverEdit] = useState({
		lastname: "",
		firstname: "",
		phone: "",
		email: "",
		birthDate: "",
		nationalId: "",
		isMale: true,
		address: "",
		licenseNumber: "",
		avatarImage: null as File | null,
		avatarPreview: "" as string | null,
	});

	const [isDirty, setIsDirty] = useState(false);

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	useEffect(() => {
		if (user) {
			setDriverEdit({
				lastname: user.lastname || "",
				firstname: user.firstname || "",
				phone: user.phone || "",
				email: user.email || "",
				birthDate: user.profile?.birth_date || "",
				nationalId: user.profile?.national_id || "",
				isMale: user.profile?.is_male ?? true,
				address: user.profile?.address || "",
				licenseNumber: user.driver?.license_number || "",
				avatarImage: null,
				avatarPreview: null,
			});
		}
	}, [user]);

	const handleAvatarChange = (file: File) => {
		const preview = URL.createObjectURL(file);

		setIsDirty(true);

		setDriverEdit((prev) => ({
			...prev,
			avatarImage: file,
			avatarPreview: preview,
		}));
	};

	const handleSaveEdit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("firstname", driverEdit.firstname);
		formData.append("lastname", driverEdit.lastname);
		formData.append("phone", driverEdit.phone);
		formData.append("birth_date", driverEdit.birthDate);
		formData.append("email", driverEdit.email);
		formData.append("address", driverEdit.address);
		formData.append("is_male", driverEdit.isMale ? "1" : "0");
		formData.append("national_id", driverEdit.nationalId);
		formData.append("license_number", driverEdit.licenseNumber);
		if (driverEdit.avatarImage) {
			formData.append("avatar", driverEdit.avatarImage);
		}

		if (user) {
			const data = await updateDriver(formData);

			if (data) {
				const updatedUser = { ...user, ...data.user };
				setUser(updatedUser);
				document.cookie = `user=${encodeURIComponent(
					JSON.stringify(updatedUser)
				)}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;

				setToastMessage(data.message || "Modification réussie");
				setToastSeverity("success");
				setToastOpen(true);
				setTimeout(() => navigateTo("/driver/profile"), 2000);
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
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
			className="flex flex-col items-start gap-8 pb-16"
		>
			<div className="flex flex-col w-full">
				<div className="flex flex-col items-start gap-1 w-full">
					<h1 className="text-3xl font-extrabold">Modifier le profil</h1>
					<p className="text-base text-slate font-medium">
						Gérez vos informations personnelles et professionnelles.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
					<div className="md:col-span-1 space-y-6">
						<div className="bg-white rounded-xl shadow-sm p-8">
							<div className="flex justify-center items-center gap-6">
								<div className="relative">
									<div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-gray-50 overflow-hidden">
										<img
											src={
												driverEdit.avatarPreview ||
												getImageUrl(user?.profile.avatar) ||
												""
											}
											className="w-full h-full object-cover"
											alt="Avatar"
										/>
									</div>
									<label
										htmlFor="avatar-upload"
										className="absolute right-0 bottom-0 bg-primary p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
									>
										<CameraAltIcon className="text-secondary !w-3 !h-3" />
									</label>
									<input
										type="file"
										accept="image/*"
										className="hidden"
										id="avatar-upload"
										onChange={(e) => {
											const file = e.target.files?.[0];
											if (file) handleAvatarChange(file);
										}}
									/>
								</div>
							</div>
						</div>

						<div className="bg-secondary rounded-3xl p-8">
							<div className="flex items-center gap-3">
								<LockIcon className="text-white" />
								<div>
									<p className="text-xl font-bold text-white mb-2">
										Authentification à deux facteurs
									</p>
									<p className="text-sm text-white/80 mb-4">
										Renforcez la sécurité de votre compte en activant la
										vérification par mobile.
									</p>
								</div>
							</div>
							<Button className="mt-2 flex justify-center items-center mx-auto px-6 py-2 rounded-lg border border-white/30 text-white text-xs font-bold tracking-wider">
								Configurer
							</Button>
						</div>

						<div className="bg-primary/20 rounded-3xl p-8">
							<div className="flex items-center gap-4">
								<VerifiedIcon className="!w-6 text-amber" />
								<div>
									<p className="text-xs font-bold text-[#4E3F00] tracking-wider">
										Statut du profil
									</p>
									<p className="text-lg font-extrabold text-[#4E3F00]">
										{user?.driver?.status === "active" ? "ACTIF" : "SUSPENDU"}
									</p>
								</div>
							</div>
						</div>
					</div>

					<form className="md:col-span-2" onSubmit={handleSaveEdit}>
						<div className="bg-white rounded-3xl shadow-sm p-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="block font-medium">Nom</label>
									<input
										type="text"
										value={driverEdit.lastname}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												lastname: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">Prénoms</label>
									<input
										type="text"
										value={driverEdit.firstname}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												firstname: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">Sexe</label>
									<Select
										className="h-11! px-1! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
										value={driverEdit.isMale ? "male" : "female"}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												isMale: e.target.value === "male",
											}));
										}}
									>
										<MenuItem className="text-sm" value="male">
											Masculin
										</MenuItem>
										<MenuItem className="text-sm" value="female">
											Féminin
										</MenuItem>
									</Select>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">Date de naissance</label>
									<input
										type="date"
										value={formatDateForInput(driverEdit.birthDate)}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												birthDate: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="md:col-span-2 space-y-2">
									<label className="block font-medium">Adresse</label>
									<input
										type="text"
										value={driverEdit.address}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												address: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">Email</label>
									<input
										type="email"
										value={driverEdit.email}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												email: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">Téléphone</label>
									<input
										type="text"
										value={driverEdit.phone}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												phone: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">
										Numéro d'identité (CIN)
									</label>
									<input
										type="text"
										value={driverEdit.nationalId}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												nationalId: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="block font-medium">Numéro de permis</label>
									<input
										type="text"
										value={driverEdit.licenseNumber}
										onChange={(e) => {
											setIsDirty(true);
											setDriverEdit((prev) => ({
												...prev,
												licenseNumber: e.target.value,
											}));
										}}
										className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>

							<div className="flex flex-col xs:flex-row justify-end gap-8 pt-8 mt-8 border-t border-gray-100">
								<Link to="/driver/profile">
									<Button className=" w-full! bg-accent text-sm! hover:bg-accent/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!">
										Annuler
									</Button>
								</Link>
								<Button
									type="submit"
									disabled={!isDirty || loading}
									className=" bg-primary text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
								>
									{loading ? "Enregistrement..." : "Enregistrer"}
								</Button>
							</div>
						</div>
					</form>
				</div>
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

export default EditProfileDriver;
