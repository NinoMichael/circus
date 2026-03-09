import { useState } from "react";
import { motion, type Variants } from "framer-motion";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import MailIcon from "@mui/icons-material/Mail";
import SettingsPhoneIcon from "@mui/icons-material/SettingsPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContact } from "../hooks/useContact";

const Contact = () => {
	const { loading, error, createContact } = useContact();

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
		"success"
	);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = await createContact({
			name,
			email,
			subject,
			message,
		});

		if (data) {
			setToastMessage(data.message);
			setToastSeverity("success");
			setToastOpen(true);
		}

		if (error) {
			setToastMessage(error || "Une erreur est survenue");
			setToastSeverity("error");
			setToastOpen(true);
		}
	};

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	};

	const pageTransition = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	return (
		<motion.div
			className="min-h-screen flex items-center justify-center"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
			transition={{ duration: 0.35 }}
		>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold mb-2">
						Contactez-nous
					</h1>
					<p className="mb-8 leading-relaxed">
						Vous avez une question sur Circus ? Contactez notre équipe pour vos
						trajets régionaux.
					</p>

					<form className="space-y-5" onSubmit={handleSubmit}>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-medium">Nom</label>
								<input
									type="text"
									placeholder="Votre nom complet"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
								/>
							</div>
							<div className="space-y-2">
								<label className="block font-medium">Email</label>
								<input
									type="email"
									placeholder="Votre@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="block font-medium">Objet</label>
							<input
								type="text"
								placeholder="Sujet de votre message"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
							/>
						</div>

						<div className="space-y-2">
							<label className="block font-medium mb-1.5">Message</label>
							<textarea
								rows={8}
								placeholder="Comment pouvons-nous vous aider ?"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
							/>
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
							>
								{loading ? "Envoi en cours..." : "Envoyer le message"}
							</Button>
						</motion.div>
					</form>
				</div>

				<div className="space-y-10">
					<div className="bg-accent rounded-2xl p-6">
						<h2 className="text-xl font-bold text-foreground mb-5">
							Nos coordonnées
						</h2>
						<div className="space-y-5">
							<div className="flex items-start gap-3">
								<SettingsPhoneIcon className="text-primary bg-[#FFD633]/10 p-2.5 rounded-sm w-10 h-10" />
								<div className="space-y-2">
									<p className="text-sm uppercase tracking-wide">Téléphone</p>
									<p className="font-semibold">+261 34 00 000 00</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<LocationOnIcon className="text-primary bg-[#FFD633]/10 p-2 rounded-sm w-10 h-10" />
								<div className="space-y-2">
									<p className="text-sm text-muted-foreground uppercase tracking-wide mb-0.5">
										Adresse
									</p>
									<p className="font-semibold">
										Enceinte CCI, Ivato
										<br />
										Antananarivo, Madagascar
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<MailIcon className="text-primary bg-[#FFD633]/10 p-2.5 rounded-sm w-10 h-10" />
								<div className="space-y-2">
									<p className="text-sm uppercase tracking-wide">Email</p>
									<p className="font-semibold">contact@circus.mg</p>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-2xl overflow-hidden shadow-lg">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.281820278648!2d47.474740162497!3d-18.814226626613998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f081890f4829cd%3A0x88d7f3c627aab6b4!2sCCI%20IVATO!5e1!3m2!1sfr!2smg!4v1772746641905!5m2!1sfr!2smg"
							width="100%"
							height="300"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Localisation Circus"
						/>
					</div>
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

export default Contact;
