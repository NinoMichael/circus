import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, type Variants } from "framer-motion";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../hooks/useAuth";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Register = () => {
	const navigate = useNavigate();
	const { form, setStep1 } = useRegisterStore();
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const passwordMismatch =
		form.password !== undefined &&
		form.password_confirmation !== undefined &&
		form.password_confirmation !== "" &&
		form.password !== form.password_confirmation;

	const handleChange = (field: string, value: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setStep1({ ...form, [field]: value } as any);
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

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
	};

	const pageTransition = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordMismatch) return;
		navigate("/register/info");
	};

	const inputClass = (hasError = false) =>
		`w-full rounded-lg border ${hasError
			? "border-red-500 focus:ring-red-400"
			: "border-gray-300 focus:ring-primary"
		} bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:border-none duration-200 transition-all`;

	return (
		<motion.div
			className="min-h-screen flex items-center justify-center py-4"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="w-full grid md:grid-cols-2 gap-8 items-center lg:mx-20">
				<div className="hidden md:block lg:w-md">
					<h1 className="lg:text-5xl text-3xl font-bold leading-tight">
						Devenez membre Circus:
						<span className="text-primary">roulez serein en région !</span>
					</h1>
					<p className="mt-4">
						Obtenez un profil perso pour gérer réservations, annulations faciles
						et promos locales
					</p>
				</div>

				<div className="rounded-lg shadow-lg bg-white p-8">
					<h2 className="text-2xl font-bold mb-1">Créer votre compte</h2>
					<p className="text-text/50 mb-6">
						Veuillez remplir les informations ci-dessous
					</p>

					<form className="space-y-5" onSubmit={handleSubmit}>
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
								disabled={passwordMismatch}
							>
								Suivant <ArrowForwardIcon className="ml-2" />
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
			{passwordMismatch && (
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
			)}
		</motion.div>
	);
};

export default Register;
