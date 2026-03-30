import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useRegisterCooperativeStore } from "../../../hooks/useAuth";
import type { RegisterCooperativeForm } from "../../../lib/types/cooperative";

import { motion, type Variants } from "framer-motion";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import busImage from "../../../assets/images/bus-img.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const JoinInfo = () => {
	const navigate = useNavigate();
	const { registerCooperative, loading, error } = useAuth();
	const { form, setStep2 } = useRegisterCooperativeStore();
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
	};

	const pageTransition = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	const passwordMismatch =
		form.password !== undefined &&
		form.password_confirmation !== undefined &&
		form.password_confirmation !== "" &&
		form.password !== form.password_confirmation;

	const handleChange = (field: string, value: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setStep2({ ...form, [field]: value } as any);
		const isPasswordField =
			field === "password" || field === "password_confirmation";
		if (isPasswordField) {
			const pwd = field === "password" ? value : form.password;
			const confirm =
				field === "password_confirmation" ? value : form.password_confirmation;

			if (pwd && confirm && pwd !== confirm) {
				setToastMessage("Les mots de passe ne correspondent pas");
				setToastSeverity("error");
				setToastOpen(true);
			}
		}
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await registerCooperative(form as RegisterCooperativeForm);
		if (success) {
			setToastMessage(
				"Inscription réussie ! Vous pouvez maintenant vous connecter."
			);
			setToastSeverity("success");
			setToastOpen(true);
			setTimeout(() => navigate("/login"), 2000);
		}

		if (error) {
			setToastMessage(error || "Une erreur est survenue");
			setToastSeverity("error");
			setToastOpen(true);
		}
	};

	const returnToRegisterPage = () => {
		navigate("/register-cooperative");
	};

	const inputClass = (hasError = false) =>
		`w-full rounded-lg border ${
			hasError
				? "border-red-500 focus:ring-red-400"
				: "border-gray-300 focus:ring-primary"
		} bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:border-none duration-200 transition-all`;

	return (
		<motion.div
			className="min-h-screen flex items-center justify-center py-16 px-8 lg:px-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="w-full grid md:grid-cols-2 items-center lg:mx-10">
				<div className="md:mb-0 mb-5">
					<motion.div
						variants={item}
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
					>
						<Button
							className="text-sm! text-text/60! hover:bg-primary/80! py-3! rounded-md font-bold! transition-all!"
							onClick={returnToRegisterPage}
						>
							<ArrowBackIcon className="mr-2" />
							Retour
						</Button>
					</motion.div>

					<div className="hidden md:block">
						<div className="bg-white p-1 rounded-md shadow-md">
							<img
								src={busImage}
								alt="Bus"
								className="w-full min-h-screen object-cover rounded-md"
							/>
						</div>
					</div>
				</div>

				<div className="md:px-10">
					<div className="space-y-5">
						<p className="uppercase text-xs font-bold bg-primary/30 px-4 py-1 rounded-full inline-block">
							espace professionnel
						</p>
						<h1 className="text-4xl font-extrabold">Devenir partenaire</h1>
						<p className="text-text/50 mb-6">
							Veuillez renseigner les informations personnelles du responsable
							de la coopérative pour l’attribution et sécurisation du compte
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="grid lg:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-medium">Nom</label>
								<div className="relative">
									<PersonOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
									<input
										type="text"
										placeholder="Dupont"
										value={form.lastname ?? ""}
										onChange={(e) => handleChange("lastname", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Prénom</label>
								<div className="relative">
									<PersonOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
									<input
										type="text"
										placeholder="Jean"
										value={form.firstname ?? ""}
										onChange={(e) => handleChange("firstname", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
						</div>

						<div className="grid lg:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-medium">Email</label>
								<div className="relative">
									<EmailOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="email"
										placeholder="exemple@mail.com"
										value={form.email ?? ""}
										onChange={(e) => handleChange("email", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Numéro de téléphone</label>
								<div className="relative">
									<LocalPhoneOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="tel"
										placeholder="06 12 34 56 78"
										value={form.phone ?? ""}
										onChange={(e) => handleChange("phone", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
										required
									/>
								</div>
							</div>
						</div>

						<div className="grid lg:not-only:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-medium">Date de naissance</label>
								<div className="relative">
									<CalendarTodayOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
									<input
										type="date"
										placeholder="01/01/1990"
										value={form.birth_date ?? ""}
										onChange={(e) => handleChange("birth_date", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Sexe</label>
								<div className="relative">
									<TransgenderOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" />
									<Select
										className="h-11! pl-6   ! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary bg-white"
										value={form.is_male ? "1" : "0"}
										onChange={(e) => handleChange("is_male", e.target.value)}
									>
										<MenuItem className="text-sm" value={1}>
											Masculin
										</MenuItem>
										<MenuItem className="text-sm" value={0}>
											Féminin
										</MenuItem>
									</Select>
								</div>
							</div>
						</div>

						<div className="grid lg:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-medium">CIN</label>
								<div className="relative">
									<PaymentOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="text"
										placeholder="101000000000"
										value={form.national_id ?? ""}
										onChange={(e) =>
											handleChange("national_id", e.target.value)
										}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Adresse</label>
								<div className="relative">
									<LocationOnOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="text"
										placeholder="123 Baker Street"
										value={form.address ?? ""}
										onChange={(e) => handleChange("address", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>
						</div>
						<div className="grid sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-medium">Mot de passe</label>
								<div className="relative">
									<LockOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="password"
										placeholder="••••••••"
										value={form.password ?? ""}
										onChange={(e) => handleChange("password", e.target.value)}
										className={inputClass(passwordMismatch)}
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Confirmer</label>
								<div className="relative">
									<LockOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="password"
										placeholder="••••••••"
										value={form.password_confirmation ?? ""}
										onChange={(e) =>
											handleChange("password_confirmation", e.target.value)
										}
										className={inputClass(passwordMismatch)}
										required
									/>
								</div>
							</div>
						</div>

						<motion.div
							variants={item}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
						>
							<Button
								className="mt-8! w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
								type="submit"
								disabled={loading}
							>
								{loading ? "Inscription..." : "Terminer"}
								<ArrowForwardIcon className="ml-2" />
							</Button>
						</motion.div>
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

export default JoinInfo;
