import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	card,
	containerForm,
	itemButton,
	pageTransition,
} from "../../lib/utils/animation";
import { usePassword } from "../../hooks/usePassword";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const ForgottenPassword = () => {
	const navigate = useNavigate();
	const { forgotPassword, loading } = usePassword();
	const [email, setEmail] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidationError(null);

		if (!email.trim()) {
			setValidationError("L'adresse e-mail est requise");
			return;
		}

		if (!validateEmail(email)) {
			setValidationError("Veuillez entrer une adresse e-mail valide");
			return;
		}

		const successResult = await forgotPassword({ email });

		if (successResult) {
			setToastMessage(
				"Si ce compte existe, un lien de réinitialisation sera envoyé."
			);
			setToastSeverity("success");
			setToastOpen(true);
			setTimeout(() => {
				navigate("/verify-email", { state: { email } });
			}, 2000);
		} else {
			setToastMessage(
				"Une erreur est survenue. Veuillez réessayer."
			);
			setToastSeverity("error");
			setToastOpen(true);
		}
	};

	return (
		<motion.div
			className="min-h-screen flex items-center justify-center pt-4 pb-8 px-8 lg:px-16"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="w-full max-w-md">
				<motion.div
					className="rounded-lg shadow-lg bg-white pb-8 overflow-hidden"
					variants={card}
					initial="hidden"
					animate="show"
				>
					<div className="px-8 py-8 flex flex-col gap-y-4 items-center text-center mx-auto">
						<LockIcon className="size-8 text-primary" />
						<h1 className="text-xl font-bold text-gray-800">
							Mot de passe oublié ?
						</h1>
					</div>

					<div className="px-8">
						<p className="text-text/50 text-center">
							Entrez votre adresse e-mail pour recevoir un lien de
							réinitialisation de votre mot de passe
						</p>

						<motion.form
							className="space-y-2 mt-8"
							variants={containerForm}
							initial="hidden"
							animate="show"
							onSubmit={handleSubmit}
						>
							<div className="space-y-2">
								<label className="block font-medium mb-1.5">
									Adresse e-mail
								</label>
								<div className="relative">
									<AlternateEmailIcon className="opacity-60 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
									<input
										type="email"
										placeholder="votre@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										disabled={loading}
										className="w-full rounded-sm border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
									/>
								</div>
								{validationError && (
									<p className="text-red-500 text-xs mt-1">
										{validationError}
									</p>
								)}
							</div>

							<motion.div
								variants={itemButton}
								whileHover={{ scale: loading ? 1 : 1.03 }}
								whileTap={{ scale: loading ? 1 : 0.97 }}
							>
								<Button
									className="mt-7! w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
									type="submit"
									disabled={loading}
									endIcon={
										loading ? (
											<CircularProgress
												size={20}
												color="inherit"
											/>
										) : (
											<ArrowRightIcon />
										)
									}
								>
									{loading ? "Envoi en cours..." : "Envoyer le lien"}
								</Button>
							</motion.div>
						</motion.form>

						<Divider className="my-6" />

						<Link
							to="/login"
							className="flex items-center justify-center gap-x-1 text-sm text-gray-400 font-medium hover:underline"
						>
							<ArrowLeftIcon className="size-4" />
							{"Retour à la connexion"}
						</Link>
					</div>
				</motion.div>
			</div>

			<Snackbar
				open={toastOpen}
				autoHideDuration={4000}
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

export default ForgottenPassword;