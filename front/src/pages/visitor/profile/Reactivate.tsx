import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { pageTransition } from "../../../lib/utils/animation";
import { useAuth, useAuthTempStore } from "../../../hooks/useAuth";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import ReplayIcon from "@mui/icons-material/Replay";

const ReactivateAccountVisitor = () => {
	const navigateTo = useNavigate();
	const { setUser, reactivate, loading: reactivateLoading } = useAuth();
	const { tempToken, tempUser, clearTempAuth } = useAuthTempStore();

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const handleReactivate = async () => {
		if (!tempToken) {
			setToastMessage("Session invalide. Veuillez vous reconnecter.");
			setToastSeverity("error");
			setToastOpen(true);
			return;
		}

		const data = await reactivate(tempToken);

		if (data) {
			document.cookie = `token=${tempToken}; path=/; max-age=${
				60 * 60 * 24 * 7
			}; secure; samesite=strict`;
			document.cookie = `user=${encodeURIComponent(
				JSON.stringify(data.user)
			)}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;

			setUser(data.user);
			clearTempAuth();

			setToastMessage("Compte réactivé avec succès");
			setToastSeverity("success");
			setToastOpen(true);

			setTimeout(() => {
				navigateTo("/");
			}, 2000);
		} else {
			setToastMessage("Erreur lors de la réactivation du compte");
			setToastSeverity("error");
			setToastOpen(true);
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
			<div className="flex flex-col mx-auto max-w-3xl">
				<div className="space-y-2">
					<h1 className="text-2xl font-extrabold">Réactiver mon compte</h1>
					<span className="opacity-60">
						Bienvenue {tempUser?.firstname || "utilisateur"} ! Votre compte a
						été désactivé. Vous pouvez le réactiver pour accéder à nouveau aux
						services de Circus.
					</span>
				</div>

				<div className="mt-8 space-y-3 bg-primary/20 rounded-lg p-6 text-text/70 border border-l-4 border-primary/60 shadow">
					<h4>
						<span className="text-lg font-bold">
							Que se passe-t-il après la réactivation ?
						</span>
					</h4>
					<p>
						Une fois votre compte réactivé, vous retrouverez l'accès complet à
						tous les services de Circus, y compris vos historique de réservation
						et vos préférences.
					</p>
				</div>

				<div className="mt-8 bg-white p-6 shadow rounded-lg">
					<h2 className="font-extrabold text-xl">Confirmer la réactivation</h2>
					<p className="opacity-60 mt-2">
						Cliquez sur le bouton ci-dessous pour réactiver votre compte
						maintenant.
					</p>

					<Button
						onClick={handleReactivate}
						disabled={reactivateLoading}
						startIcon={<ReplayIcon />}
						className="mt-6 w-full bg-primary text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
					>
						{reactivateLoading ? "Réactivation..." : "Réactiver mon compte"}
					</Button>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-100">
					<p className="text-center opacity-60 text-sm">
						Vous souhaitez supprimer définitivement votre compte ?{" "}
						<a
							href="/profile/delete"
							className="text-primary font-medium hover:underline"
						>
							Supprimer mon compte
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

export default ReactivateAccountVisitor;
