import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pageTransition } from "../lib/utils/animation";
import SEO from "../components/seo/SEO";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const faqs = [
	{
		q: "Comment créer un compte sur Circus ?",
		a: "Cliquez sur 'S'inscrire' en haut à droite de la page d'accueil. Remplissez le formulaire avec vos informations personnelles (nom, téléphone, email) et validez. Vous recevrez un code de vérification par SMS pour activer votre compte.",
	},
	{
		q: "Comment rechercher un trajet ?",
		a: "Sur la page d'accueil, saissez votre ville de départ et votre ville d'arrivée, ainsi que la date souhaitée. Cliquez sur 'Rechercher' pour afficher les trajets disponibles. Vous pouvez ensuite filtrer par heure, prix et coopérative.",
	},
	{
		q: "Comment réserver un siège ?",
		a: "Sélectionnez le trajet qui vous convient, Choisissez votre siège parmi les places disponibles, Entrez vos informations de voyage, Effectuez le paiement via Mobile Money, carte ou espèces. Vous recevrez une confirmation par SMS et email.",
	},
	{
		q: "Puis-je choisir mon siège spécifique ?",
		a: "Oui, lors de la réservation, une carte interactive vous permet de visualiser tous les sièges disponibles. Cliquez sur le siège de votre choix pour le sélectionner. Les places occupées apparaissent en gris.",
	},
	{
		q: "Quels sont les modes de paiement acceptés ?",
		a: "Nous acceptons plusieurs modes de paiement : Mobile Money (MVola, Orange Money, Airtel Money), cartes bancaires (Visa, Mastercard), et paiement en espèces auprès de nos points de vente partenaires.",
	},
	{
		q: "Comment annuler ma réservation ?",
		a: "Allez dans 'Mes réservations' depuis votre compte. Sélectionnez la réservation à annuler et cliquez sur 'Annuler'. Vous pouvez annuler jusqu'à 2 heures avant le départ pour un remboursement intégral.",
	},
	{
		q: "Que faire en cas de retard ou d'annulation du bus ?",
		a: "En cas de retard ou d'annulation par la coopérative, vous serez immédiatement notifié par SMS. Vous pouvez choisir un autre trajet ou demander un remboursement intégral. Contactez notre support au +261 34 00 000 00 pour toute assistance.",
	},
	{
		q: "Comment obtenir ma facture ou reçu ?",
		a: "Après chaque réservation, une facture est disponible dans la section 'Mes réservations' de votre compte. Vous pouvez la télécharger au format PDF ou l'envoyer par email.",
	},
	{
		q: "Que faire si j'ai oublié mon mot de passe ?",
		a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre numéro de téléphone et vous recevrez un code de vérification pour réinitialiser votre mot de passe.",
	},
	{
		q: "Comment contacter le support client ?",
		a: "Vous pouvez nous contacter par téléphone au +261 34 00 000 00 (disponible 24h/24), par email à support@circus.mg, ou via le formulaire de contact sur la page 'Contact'. Notre équipe répond sous 24 heures.",
	},
];

const Help = () => {
	const containerVariants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.08,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 },
		},
	};

	return (
		<>
			<SEO
				title="Aide"
				description="Trouvez toutes les réponses à vos questions sur l'utilisation de la plateforme Circus. FAQ, guide de réservation et contact du support."
				keywords="aide,FAQ,support,guide réservation,questions fréquentes"
				url="/help"
			/>
			<motion.div
				className="min-h-screen py-16 px-8 lg:px-16"
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageTransition}
			>
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
							Support
						</span>
						<h1 className="text-3xl md:text-4xl font-bold mb-4">
							Centre d'aide
						</h1>
						<p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
							Trouvez rapidement les réponses à vos questions sur l'utilisation
							de Circus.
						</p>
					</div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="show"
						className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
					>
						<motion.div
							variants={itemVariants}
							className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<PhoneInTalkIcon className="w-6 h-6 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Téléphone</h3>
							<p className="text-sm text-gray-500 mb-4">
								Disponible 24h/24, 7j/7
							</p>
							<a
								href="tel:+261340000000"
								className="text-primary font-semibold hover:underline"
							>
								+261 34 00 000 00
							</a>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<EmailIcon className="w-6 h-6 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Email</h3>
							<p className="text-sm text-gray-500 mb-4">Réponse sous 24h</p>
							<a
								href="mailto:support@circus.mg"
								className="text-primary font-semibold hover:underline"
							>
								support@circus.mg
							</a>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<LocationOnIcon className="w-6 h-6 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Bureaux</h3>
							<p className="text-sm text-gray-500 mb-4">Lundi - Vendredi</p>
							<span className="text-primary font-semibold">
								CCI Ivato, Antananarivo
							</span>
						</motion.div>
					</motion.div>

					<div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-12">
						<div className="flex items-center gap-3 mb-6">
							<HelpOutlineIcon className="w-6 h-6 text-primary" />
							<h2 className="text-xl font-bold">Questions fréquentes</h2>
						</div>

						<div className="space-y-3">
							{faqs.map((faq, i) => (
								<motion.div key={i} variants={itemVariants}>
									<MuiAccordion
										disableGutters
										elevation={0}
										className="border border-gray-200 rounded-xl bg-gray-50/50 overflow-hidden"
									>
										<MuiAccordionSummary
											expandIcon={<AddOutlinedIcon className="text-gray-500" />}
											className="px-4 py-2"
										>
											<span className="font-medium">{faq.q}</span>
										</MuiAccordionSummary>
										<MuiAccordionDetails className="px-4 pb-4">
											<span className="text-gray-600 leading-relaxed">
												{faq.a}
											</span>
										</MuiAccordionDetails>
									</MuiAccordion>
								</motion.div>
							))}
						</div>
					</div>

					<div className="bg-secondary rounded-2xl p-6 md:p-8 text-center">
						<h2 className="text-xl font-bold text-white mb-2">
							Vous ne trouvez pas la réponse ?
						</h2>
						<p className="text-gray-400 mb-6">
							Notre équipe est là pour vous aider.
						</p>
						<Link to="/contact">
							<Button className="cursor-pointer bg-primary font-bold px-8 py-3 rounded-xl text-sm shadow-lg hover:bg-primary/90 transition-colors">
								Contactez-nous
							</Button>
						</Link>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default Help;
