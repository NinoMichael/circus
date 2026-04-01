import { motion } from "framer-motion";
import { pageTransition } from "../lib/utils/animation";
import SEO from "../components/seo/SEO";

import AssignmentIcon from "@mui/icons-material/Assignment";
import GavelIcon from "@mui/icons-material/Gavel";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CancelIcon from "@mui/icons-material/Cancel";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DescriptionIcon from "@mui/icons-material/Description";

const sections = [
	{
		icon: AssignmentIcon,
		title: "Acceptation des conditions",
		content: `En accédant et en utilisant la plateforme Circus, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme. Ces conditions constituent un accord légal entre vous et Circus.`,
	},
	{
		icon: GavelIcon,
		title: "Utilisation du service",
		content: `Vous devez avoir au moins 18 ans pour utiliser Circus. Vous acceptez d'utiliser notre plateforme conformément aux lois et réglementations en vigueur. Vous vous engagez à ne pas copier, modifier ou distribuer le contenu de notre plateforme sans autorisation. Toute utilisation abusive entraîne la suspension de votre compte.`,
	},
	{
		icon: CreditCardIcon,
		title: "Réservations et paiements",
		content: `Les réservations effectuées sur Circus sont confirmées sous réserve de disponibilité. Les prix affichés sont susceptibles de modifications. Le paiement s'effectue via Mobile Money, carte bancaire ou espèces. Une confirmation vous sera envoyée par email et SMS.`,
	},
	{
		icon: CancelIcon,
		title: "Annulation et remboursement",
		content: `Vous pouvez annuler votre réservation jusqu'à 2 heures avant le départ pour un remboursement intégral. Entre 2 heures et le départ, aucun remboursement n'est effectué. Les annulations doivent être faites via votre compte ou en contactant le support. En cas d'annulation par le transporteur, vous serez remboursé intégralement.`,
	},
	{
		icon: SupportAgentIcon,
		title: "Responsabilité",
		content: `Circus agit en tant qu'intermédiaire entre les voyageurs et les coopératives de transport. Nous ne sommes pas responsables des retards, accidents ou Litiges directement liés aux prestations de transport. Notre responsabilité se limite au montant paid for la réservation.`,
	},
	{
		icon: DescriptionIcon,
		title: "Propriété intellectuelle",
		content: `Tous les contenus présents sur la plateforme Circus (logos, textes, images, graphismes) sont protégés par les droits de propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite. Vous conservez la propriété des contenus que vous soumettez, mais accordez à Circus une licence pour les utiliser.`,
	},
];

const Terms = () => {
	return (
		<>
			<SEO
				title="Conditions d'utilisation"
				description="Consultez les conditions d'utilisation de Circus pour comprendre les règles et engagements liés à l'utilisation de notre plateforme de transport."
				keywords="conditions d'utilisation,CGU,termes et conditions,règlement"
				url="/terms"
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
							Légal
						</span>
						<h1 className="text-3xl md:text-4xl font-bold mb-4">
							Conditions d'utilisation
						</h1>
						<p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
							Ces conditions régissent votre utilisation de la plateforme Circus
							et les services proposés.
						</p>
						<p className="text-sm text-gray-400 mt-4">
							Dernière mise à jour : Avril 2026
						</p>
					</div>

					<div className="space-y-8">
						<section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
							<h2 className="text-xl font-bold mb-4">Préambule</h2>
							<p className="text-gray-600 leading-relaxed">
								Les présentes conditions d'utilisation constituent le contrat
								entre Circus et tout utilisateur de la plateforme.Elles
								définissent les droits et obligations de chaque partie dans le
								cadre de l'utilisation des services de réservation de transport
								proposés par notre plateforme.
							</p>
						</section>

						{sections.map((section, index) => (
							<section
								key={index}
								className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
							>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
										<section.icon className="w-5 h-5 text-primary" />
									</div>
									<h2 className="text-xl font-bold">{section.title}</h2>
								</div>
								<p className="text-gray-600 leading-relaxed pl-13">
									{section.content}
								</p>
							</section>
						))}

						<section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
							<h2 className="text-xl font-bold mb-4">Résolution des litiges</h2>
							<p className="text-gray-600 leading-relaxed">
								En cas de litige, nous encourageons d'abord la résolution à
								l'amiable. Si aucun accord n'est trouvé, le litige sera soumis
								aux tribunaux compétents d'Antananarivo, Madagascar. La langue
								officielle de toute procédure sera le français.
							</p>
						</section>

						<section className="bg-secondary rounded-2xl p-6 md:p-8">
							<h2 className="text-xl font-bold text-white mb-4">Contact</h2>
							<p className="text-gray-400 leading-relaxed">
								Pour toute question concernant ces conditions d'utilisation,
								veuillez nous contacter à contact@circus.mg ou au +261 34 00 000
								00.
							</p>
						</section>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default Terms;
