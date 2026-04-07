import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { card, itemButton, pageTransition } from "../../lib/utils/animation";
import { usePassword } from "../../hooks/usePassword";

import verifyImage from "../../assets/images/verify.jpg";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const VerifyEmail = () => {
	const location = useLocation();
	const { resendResetLink, loading } = usePassword();

	const email = (location.state as { email?: string })?.email || "";
	const [emailInput, setEmailInput] = useState(email);

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const handleResend = async (e: React.FormEvent) => {
		e.preventDefault();
		const targetEmail = email || emailInput;
		if (!targetEmail.trim()) return;

		const successResult = await resendResetLink({ email: targetEmail });

		if (successResult) {
			setToastMessage(
				"Un nouveau lien de réinitialisation a été envoyé à votre adresse email."
			);
			setToastSeverity("success");
			setToastOpen(true);
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
					<div className="px-8 py-8 flex flex-col gap-y-8 items-center text-center mx-auto">
						<div className="relative">
							<MailIcon className="size-16 text-text/80 bg-primary/30 p-4 rounded-full" />
							<CheckCircleIcon className="absolute -bottom-2  -right-2 text-primary size-6" />
						</div>

						<h1 className="text-xl font-bold text-gray-800">
							Vérifiez votre boite de réception
						</h1>
					</div>

					<div className="px-8 space-y-8">
						<p className="text-text/50 text-center">
							Un e-mail de réinitialisation a été envoyé à votre adresse.
							Veuillez cliquer sur le lien pour réinitialiser votre mot de
							passe
						</p>

						<img
							src={verifyImage}
							alt="Image de vérification"
							className="object-cover h-36 rounded-lg w-full"
						/>

						<motion.form onSubmit={handleResend}>
							{!email && (
								<div className="mb-4">
									<input
										type="email"
										placeholder="Votre adresse e-mail"
										value={emailInput}
										onChange={(e) =>
											setEmailInput(e.target.value)
										}
										disabled={loading}
										className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all disabled:bg-gray-100"
									/>
								</div>
							)}

							<motion.div
								variants={itemButton}
								whileHover={{ scale: loading ? 1 : 1.03 }}
								whileTap={{ scale: loading ? 1 : 0.97 }}
							>
								<Button
									className="mt-7! w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
									type="submit"
									disabled={loading || (!email && !emailInput)}
									startIcon={
										loading ? (
											<CircularProgress
												size={20}
												color="inherit"
											/>
										) : (
											<SendIcon />
										)
									}
								>
									{loading
										? "Envoi en cours..."
										: "Renvoyer l'email"}
								</Button>
							</motion.div>
						</motion.form>

						<Link
							to="/forgotten-password"
							className="block text-center text-sm text-primary hover:underline"
						>
							Modifier l'adresse e-mail
						</Link>
					</div>
				</motion.div>

				<p className="text-sm text-center text-text/50 mt-8">
					Vous ne trouvez pas l'e-mail ? Pensez à vérifier vos courriels
					indésirables (spam)
				</p>

				<div className="text-center mt-4">
					<Link
						to="/login"
						className="flex items-center justify-center gap-x-1 text-sm text-gray-400 font-medium hover:underline"
					>
						<ArrowLeftIcon className="size-4" />
						{"Retour à la connexion"}
					</Link>
				</div>
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

export default VerifyEmail;