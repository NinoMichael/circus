import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
	const navigateTo = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const { login, loading, error, setUser } = useAuth();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const data = await login({ email, password });

		if (data) {
			document.cookie = `token=${data.token}; path=/; max-age=${
				60 * 60 * 24 * 7
			}; secure; samesite=strict`;
			document.cookie = `user=${encodeURIComponent(
				JSON.stringify(data.user)
			)}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;

			setUser(data.user);

			switch (data.user.role) {
				case "passenger":
					navigateTo(`/`);
					break;
				case "driver":
					navigateTo(`/driver/overview`);
					break;
				case "cooperative":
					navigateTo(`/cooperative/overview`);
					break;
				case "manager":
					navigateTo(`/`);
					break;
				case "admin":
					navigateTo(`/admin/dashboard`);
					break;
				default:
					navigateTo(`/`);
					break;
			}
		}

		if (error) {
			setToastMessage(error || "Une erreur est survenue");
			setToastSeverity("error");
			setToastOpen(true);
		}
	}

	const container: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
			},
		},
	};

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	};

	const card: Variants = {
		hidden: { opacity: 0, y: 40, scale: 0.96 },
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const pageTransition = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
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
			<div className="w-full max-w-md">
				<motion.div
					className="rounded-lg shadow-lg bg-white overflow-hidden"
					variants={card}
					initial="hidden"
					animate="show"
				>
					<div className="bg-gradient-to-b from-tertiary/50 to-tertiary/20 px-8 py-8 text-center">
						<h2 className="text-xl font-bold text-gray-800">
							Heureux de vous revoir !
						</h2>
					</div>

					<div className="px-8 py-8">
						<h1 className="text-lg font-bold mb-1 text-gray-800">
							Se connecter
						</h1>
						<p className="text-text/50">Veuillez entrer vos identifiants</p>

						<motion.form
							className="space-y-5 mt-8"
							onSubmit={handleSubmit}
							variants={container}
							initial="hidden"
							animate="show"
						>
							<div>
								<label className="block font-medium mb-1.5">
									E-mail ou téléphone
								</label>
								<div className="relative">
									<AlternateEmailIcon className="opacity-60 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
									<input
										type="text"
										placeholder="votre@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full rounded-sm border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="font-medium">Mot de passe</label>
									<Link
										to="#"
										className="text-sm font-semibold text-primary hover:underline"
									>
										Oublié ?
									</Link>
								</div>
								<div className="relative">
									<LockIcon className="opacity-60 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
									<input
										type={showPassword ? "text" : "password"}
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full rounded-sm border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute opacity-60 cursor-pointer right-3 top-1/2 -translate-y-1/2"
									>
										{showPassword ? (
											<VisibilityOffIcon className="w-4 h-4" />
										) : (
											<VisibilityIcon className="w-4 h-4" />
										)}
									</button>
								</div>
							</div>

							<motion.div
								variants={item}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
							>
								<Button
									className="mt-8! w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
									disabled={loading}
									type="submit"
									endIcon={<LoginIcon />}
								>
									{loading ? "Connexion en cours..." : "Se connecter"}
								</Button>
							</motion.div>
						</motion.form>

						<p className="text-center text-sm mt-8">
							Pas encore de compte ?{" "}
							<Link
								to="/register"
								className="font-medium text-primary hover:underline"
							>
								Créer un compte
							</Link>
						</p>
					</div>
				</motion.div>
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

export default Login;
