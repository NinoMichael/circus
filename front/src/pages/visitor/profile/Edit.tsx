import { motion } from "framer-motion";
import { pageTransition } from "../../../lib/utils/animation";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDateForInput } from "../../../lib/utils/date";
import { getImageUrl } from "../../../lib/utils/media";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

const EditProfileVisitor = () => {
	const navigateTo = useNavigate();
	const { user, setUser, error, loading, updateVisitor } = useAuth();

	const [visitorEdit, setVisitorEdit] = useState({
		lastname: "",
		firstname: "",
		phone: "",
		email: "",
		birthDate: "",
		nationalId: "",
		isMale: true,
		address: "",
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
			setVisitorEdit({
				lastname: user.lastname || "",
				firstname: user.firstname || "",
				phone: user.phone || "",
				email: user.email || "",
				birthDate: user.profile?.birth_date || "",
				nationalId: user.profile?.national_id || "",
				isMale: user.profile?.is_male ?? true,
				address: user.profile?.address || "",
				avatarImage: null,
				avatarPreview: null,
			});
		}
	}, [user]);

	const handleAvatarChange = (file: File) => {
		const preview = URL.createObjectURL(file);

		setIsDirty(true);

		setVisitorEdit((prev) => ({
			...prev,
			avatarImage: file,
			avatarPreview: preview,
		}));
	};

	const handleSaveEdit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("firstname", visitorEdit.firstname);
		formData.append("lastname", visitorEdit.lastname);
		formData.append("phone", visitorEdit.phone);
		formData.append("birth_date", visitorEdit.birthDate);
		formData.append("email", visitorEdit.email);
		formData.append("address", visitorEdit.address);
		formData.append("is_male", visitorEdit.isMale ? "1" : "0");
		formData.append("national_id", visitorEdit.nationalId);
		if (visitorEdit.avatarImage) {
			formData.append("avatar", visitorEdit.avatarImage);
		}

		if (user) {
			const data = await updateVisitor(formData);

			if (data) {
				const updatedUser = { ...user, ...data.user };
				setUser(updatedUser);
				document.cookie = `user=${encodeURIComponent(
					JSON.stringify(updatedUser)
				)}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;

				setToastMessage(data.message || "Modification réussie");
				setToastSeverity("success");
				setToastOpen(true);
				setTimeout(() => navigateTo("/profile"), 2000);
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
			className="min-h-screen py-12 px-8 lg:px-16"
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<form
				className="bg-white flex flex-col mx-auto max-w-3xl rounded-xl shadow p-8"
				onSubmit={handleSaveEdit}
			>
				<div className="space-y-2">
					<h1 className="text-2xl font-extrabold">Modifier le profil</h1>
					<span className="opacity-60">
						Gérez vos informations personnelles et les paramètres de votre
						compte
					</span>
				</div>

				<div className="mt-8 flex justify-center items-center gap-6">
					<div className="relative">
						<div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-gray-50 overflow-hidden">
							<img
								src={
									visitorEdit.avatarPreview ||
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

				<div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
					<div className="space-y-2">
						<label className="block font-medium">Nom</label>
						<input
							type="text"
							value={visitorEdit.lastname}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									lastname: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Prénoms</label>
						<input
							type="text"
							value={visitorEdit.firstname}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									firstname: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Adresse e-mail</label>
						<input
							type="email"
							value={visitorEdit.email}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									email: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Téléphone</label>
						<input
							type="text"
							value={visitorEdit.phone}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									phone: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Date de naissance</label>
						<input
							type="date"
							value={formatDateForInput(visitorEdit.birthDate)}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									birthDate: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Numéro d'identité (CIN)</label>
						<input
							type="text"
							value={visitorEdit.nationalId}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									nationalId: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Adresse</label>
						<input
							type="text"
							value={visitorEdit.address}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
									...prev,
									address: e.target.value,
								}));
							}}
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-medium">Sexe</label>
						<Select
							className="h-11! px-1! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
							value={visitorEdit.isMale ? "male" : "female"}
							onChange={(e) => {
								setIsDirty(true);
								setVisitorEdit((prev) => ({
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
				</div>

				<div className="flex flex-col xs:flex-row justify-end gap-8 pt-8 mt-8 border-t border-gray-100">
					<Link to="/profile">
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
			</form>

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

export default EditProfileVisitor;
