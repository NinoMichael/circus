import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useRegisterStore } from "../../hooks/useAuth";
import type { RegisterForm } from "../../lib/types/auth";

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

const RegisterInfo = () => {
	const navigate = useNavigate();
	const { register, loading, error } = useAuth();
	const { form, setStep2 } = useRegisterStore();
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

	const handleChange = (field: string, value: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setStep2({ ...form, [field]: value } as any);
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await register(form as RegisterForm);
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
		navigate("/register");
	};

	return (
		<motion.div
			className="min-h-screen flex items-center justify-center py-4"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="w-full grid md:grid-cols-2 gap-8 items-center">
				<div className="-mt-8 md:mt-0 lg:w-md">
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

					<div className="hidden md:block ">
						<h1 className="lg:text-5xl text-3xl font-bold leading-tight">
							Devenez membre Circus:
							<span className="text-primary">roulez serein en région !</span>
						</h1>
						<p className="hidden md:block mt-4">
							Obtenez un profil perso pour gérer réservations, annulations
							faciles et promos locales
						</p>
					</div>
				</div>

				<div className="rounded-lg shadow-lg bg-white p-8">
					<h2 className="text-2xl font-bold mb-1">Créer votre compte</h2>
					<p className="text-text/50 mb-6">
						Veuillez compléter vos informations personnelles
					</p>

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
									<TransgenderOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
									<Select
										className="h-11! pl-6   ! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
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

					<p className="text-center text-sm mt-6">
						En vous inscrivant, vous acceptez nos{" "}
						<a href="#" className="underline text-primary">
							Conditions d'Utilisation
						</a>{" "}
						et notre{" "}
						<a href="#" className="underline text-primary">
							Politique de Confidentialité
						</a>
					</p>
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

export default RegisterInfo;
