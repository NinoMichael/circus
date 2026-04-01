import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { pageTransition } from "../../../lib/utils/animation";
import { useAuth } from "../../../hooks/useAuth";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import WarningIcon from "@mui/icons-material/WarningOutlined";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import SellIcon from "@mui/icons-material/SellOutlined";
import BoxIcon from "@mui/icons-material/BackpackOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumberOutlined";

const DeleteAccountVisitor = () => {
	const navigateTo = useNavigate();
	const { deleteUser, loading } = useAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!password) {
			setToastMessage("Veuillez entrer votre mot de passe");
			setToastSeverity("error");
			setToastOpen(true);
			return;
		}

		const success = await deleteUser(password);

		if (success) {
			setToastMessage("Compte supprimé définitivement");
			setToastSeverity("success");
			setToastOpen(true);
			setTimeout(() => {
				navigateTo("/login");
			}, 1500);
		} else {
			setToastMessage("Mot de passe incorrect");
			setToastSeverity("error");
			setToastOpen(true);
		}
	}

	return (
		<motion.div
			className="min-h-screen py-12 px-8 lg:px-16"
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<form className="flex flex-col mx-auto max-w-3xl" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<h1 className="text-2xl font-extrabold">
						Supprimer définitivement mon compte
					</h1>
					<span className="opacity-60">
						Nous sommes désolés de vous voir partir. Votre expérience chez
						Circus est importante pour nous
					</span>
				</div>

				<div className="mt-8 space-y-3 bg-primary/20 rounded-lg p-6 text-text/70 border border-l-4 border-primary/60 shadow">
					<h4>
						<WarningIcon className="-mt-1.5 mr-2 text-primary/70" />
						<span className="text-lg font-bold">Action irréversible</span>
					</h4>
					<p>
						Une fois votre compte supprimé, toutes vos données personnelles,
						historiques de paiement et avantages seront effacés de nos serveurs
						de manière permanente. Cette action ne peut etre annulée
					</p>
				</div>

				<div className="mt-8">
					<h2 className="font-extrabold text-xl">
						Conséquences de la suppression
					</h2>

					<div className="mt-4 grid gap-4">
						<div className="bg-white rounded-lg shadow p-6 flex gap-3 items-center">
							<HistoryIcon className=" text-primary bg-primary/20 p-2 rounded-full size-10" />
							<span>Perte de l'historique des réservations</span>
						</div>
						<div className="bg-white rounded-lg shadow p-6 flex gap-3 items-center">
							<ConfirmationNumberIcon className=" text-primary bg-primary/20 p-2 rounded-full size-10" />
							<span>Annulation de tous les billets et pass actifs</span>
						</div>
						<div className="bg-white rounded-lg shadow p-6 flex gap-3 items-center">
							<SellIcon className=" text-primary bg-primary/20 p-2 rounded-full size-10" />
							<span>Suppression des données personnelles</span>
						</div>
						<div className="bg-white rounded-lg shadow p-6 flex gap-3 items-center">
							<BoxIcon className=" text-primary bg-primary/20 p-2 rounded-full size-10" />
							<span>Accès révoqué aux offres exclusives</span>
						</div>
					</div>
				</div>

				<div className="mt-8 bg-white p-6 shadow rounded-lg">
					<h2 className="font-extrabold text-xl">Vérification de sécurité</h2>
					<p className="opacity-60 mt-2">
						Entrer votre mot de passe pour confirmer l'opération
					</p>

					<div className="relative mt-4">
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

				<div className="flex flex-col xs:flex-row w-full gap-8 pt-8 mt-8 border-t border-gray-100">
					<Link
						to="/profile"
						className="block w-full bg-accent hover:bg-accent/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm! text-center"
					>
						<Button className="text-sm! font-bold!">Annuler</Button>
					</Link>
					<Button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
					>
						{loading ? "Suppression..." : "Confirmer"}
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

export default DeleteAccountVisitor;
