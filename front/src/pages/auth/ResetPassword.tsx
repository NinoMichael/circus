import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	card,
	containerForm,
	itemButton,
	pageTransition,
} from "../../lib/utils/animation";
import { usePassword } from "../../hooks/usePassword";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { resetPassword, loading } = usePassword();

	const token = searchParams.get("token") || "";
	const emailParam = searchParams.get("email") || "";

	const [email, setEmail] = useState(emailParam);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState<{
		password?: string;
		confirmPassword?: string;
		email?: string;
	}>({});
	const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	useEffect(() => {
		if (!token || !emailParam) {
			setIsValidToken(false);
		} else {
			setIsValidToken(true);
		}
	}, [token, emailParam]);

	const validateForm = (): boolean => {
		const errors: {
			password?: string;
			confirmPassword?: string;
			email?: string;
		} = {};

		if (!email.trim()) {
			errors.email = "L'adresse e-mail est requise";
		}

		if (!password) {
			errors.password = "Le mot de passe est requis";
		} else if (password.length < 8) {
			errors.password =
				"Le mot de passe doit contenir au moins 8 caractères";
		}

		if (!confirmPassword) {
			errors.confirmPassword = "Veuillez confirmer votre mot de passe";
		} else if (password !== confirmPassword) {
			errors.confirmPassword = "Les mots de passe ne correspondent pas";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const successResult = await resetPassword({
			email,
			token,
			password,
			password_confirmation: confirmPassword,
		});

		if (successResult) {
			setIsSuccess(true);
			setToastMessage(
				"Votre mot de passe a été réinitialisé avec succès."
			);
			setToastSeverity("success");
			setToastOpen(true);
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		} else {
			setToastMessage(
				"Une erreur est survenue. Veuillez réessayer."
			);
			setToastSeverity("error");
			setToastOpen(true);
		}
	};

	if (isValidToken === null) {
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
					<CircularProgress />
				</div>
			</motion.div>
		);
	}

	if (isValidToken === false) {
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
							<LockIcon className="size-8 text-red-500" />
							<h1 className="text-xl font-bold text-gray-800">
								Lien invalide
							</h1>
						</div>

						<div className="px-8">
							<p className="text-text/50 text-center mb-6">
								Le lien de réinitialisation est invalide ou a expiré.
								Veuillez faire une nouvelle demande.
							</p>

							<Link
								to="/forgotten-password"
								className="flex items-center justify-center gap-x-1 text-sm text-primary font-medium hover:underline"
							>
								<ArrowLeftIcon className="size-4" />
								{"Demander un nouveau lien"}
							</Link>
						</div>
					</motion.div>
				</div>
			</motion.div>
		);
	}

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
					<div className="px-8 pt-8 pb-4 flex flex-col gap-y-4 items-center text-center mx-auto">
						<LockIcon className="size-8 text-primary" />
						<h1 className="text-xl font-bold text-gray-800">
							Réinitialiser votre mot de passe
						</h1>
					</div>

					<div className="px-8">
						{!isSuccess && (
							<>
								<p className="text-text/50 text-center">
									Veuillez saisir votre nouveau mot de passe ci-dessous
									pour sécuriser votre compte
								</p>

								<motion.form
									className="space-y-6 mt-8"
									variants={containerForm}
									initial="hidden"
									animate="show"
									onSubmit={handleSubmit}
								>
									<div className="space-y-2">
										<label className="font-medium">
											Adresse e-mail
										</label>
										<div className="relative mt-2">
											<AlternateEmailIcon className="opacity-60 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
											<input
												type="email"
												placeholder="votre@email.com"
												value={email}
												onChange={(e) =>
													setEmail(e.target.value)
												}
												disabled={loading}
												className="w-full rounded-sm border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all disabled:bg-gray-100"
											/>
										</div>
										{validationErrors.email && (
											<p className="text-red-500 text-xs mt-1">
												{validationErrors.email}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<label className="font-medium">
											Nouveau mot de passe
										</label>
										<div className="relative mt-2">
											<LockIcon className="opacity-60 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
											<input
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder="••••••••"
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
												disabled={loading}
												className="w-full rounded-sm border border-gray-300 bg-white pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all disabled:bg-gray-100"
											/>
											<button
												type="button"
												onClick={() =>
													setShowPassword(!showPassword)
												}
												disabled={loading}
												className="absolute opacity-60 cursor-pointer right-3 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
											>
												{showPassword ? (
													<VisibilityOffIcon className="w-4 h-4" />
												) : (
													<VisibilityIcon className="w-4 h-4" />
												)}
											</button>
										</div>
										{validationErrors.password && (
											<p className="text-red-500 text-xs mt-1">
												{validationErrors.password}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<label className="font-medium">
											Confirmer mot de passe
										</label>
										<div className="relative mt-2">
											<LockIcon className="opacity-60 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
											<input
												type={
													showConfirmPassword
														? "text"
														: "password"
												}
												placeholder="••••••••"
												value={confirmPassword}
												onChange={(e) =>
													setConfirmPassword(
														e.target.value
													)
												}
												disabled={loading}
												className="w-full rounded-sm border border-gray-300 bg-white pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all disabled:bg-gray-100"
											/>
											<button
												type="button"
												onClick={() =>
													setShowConfirmPassword(
														!showConfirmPassword
													)
												}
												disabled={loading}
												className="absolute opacity-60 cursor-pointer right-3 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
											>
												{showConfirmPassword ? (
													<VisibilityOffIcon className="w-4 h-4" />
												) : (
													<VisibilityIcon className="w-4 h-4" />
												)}
											</button>
										</div>
										{validationErrors.confirmPassword && (
											<p className="text-red-500 text-xs mt-1">
												{
													validationErrors.confirmPassword
												}
											</p>
										)}
									</div>

									<motion.div
										variants={itemButton}
										whileHover={{
											scale: loading ? 1 : 1.03,
										}}
										whileTap={{
											scale: loading ? 1 : 0.97,
										}}
									>
										<Button
											className="mt-4! w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
											type="submit"
											disabled={loading}
											endIcon={
												loading ? (
													<CircularProgress
														size={20}
														color="inherit"
													/>
												) : null
											}
										>
											{loading
												? "Réinitialisation..."
												: "Mettre à jour"}
										</Button>
									</motion.div>
								</motion.form>
							</>
						)}

						{isSuccess && (
							<div className="text-center mt-6">
								<CheckCircleIcon
									className="size-12 text-green-500 mb-2"
								/>
								<p className="text-text/70">
									Vous allez être redirigé vers la page de
									connexion...
								</p>
							</div>
						)}

						<Link
							to="/login"
							className="flex items-center justify-center gap-x-1 text-sm text-gray-400 font-medium hover:underline mt-6"
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

export default ResetPassword;