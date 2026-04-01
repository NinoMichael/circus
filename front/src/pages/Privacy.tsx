import { motion } from "framer-motion";
import { pageTransition } from "../lib/utils/animation";
import SEO from "../components/seo/SEO";

import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import StorageIcon from "@mui/icons-material/Storage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const sections = [
	{
		icon: SecurityIcon,
		title: "Collecte des informations",
		content: `Nous collectons les informations personnelles que vous nous fournissez lors de votre inscription, telles que votre nom, adresse email, numéro de téléphone et informations de paiement. Nous collectons également des données automatically lors de votre utilisation de la plateforme, incluant votre adresse IP, type de navigateur et pages visitées.`,
	},
	{
		icon: VerifiedUserIcon,
		title: "Utilisation des données",
		content: `Vos informations sont utilisées pour traiter vos réservations, vous fournir un support client, améliorer nos services et vous envoyer des communications relatives à votre compte. Nous pouvons également utiliser vos données pour vous proposer des offres personnalisées et des promotions adaptées à vos besoins.`,
	},
	{
		icon: LockIcon,
		title: "Protection des données",
		content: `Nous mettons en œuvre des mesures de sécurité strictes pour protéger vos données personnelles, incluant le chiffrement SSL, des pare-feux et des audits de sécurité réguliers. Vos informations de paiement sont traitées via des passerelles sécurisées conformes aux standards PCI-DSS.`,
	},
	{
		icon: StorageIcon,
		title: "Conservation des données",
		content: `Nous conservons vos données personnelles aussi longtemps que votre compte reste actif ou aussi longtemps que nécessaire pour vous fournir nos services. Vous pouvez à tout moment demander la suppression de vos données en contactant notre support.`,
	},
	{
		icon: DeleteOutlineIcon,
		title: "Vos droits",
		content: `Vous disposez du droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez également vous opposer au traitement de vos données ou demander la portabilité de vos informations. Pour exercer ces droits, contactez-nous à contact@circus.mg.`,
	},
	{
		icon: ContactMailIcon,
		title: "Contact",
		content: `Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter à l'adresse email contact@circus.mg ou par téléphone au +261 34 00 000 00.`,
	},
];

const Privacy = () => {
	return (
		<>
			<SEO
				title="Politique de confidentialité"
				description="Consultez la politique de confidentialité de Circus pour comprendre comment nous protégeons et gérons vos données personnelles."
				keywords="confidentialité, politique de confidentialité, données personnelles, RGPD"
				url="/privacy"
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
							Politique de confidentialité
						</h1>
						<p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
							Cette politique de confidentialité décrit comment Circus collecte,
							utilise et protège vos données personnelles.
						</p>
						<p className="text-sm text-gray-400 mt-4">
							Dernière mise à jour : Avril 2026
						</p>
					</div>

					<div className="space-y-8">
						<section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
							<h2 className="text-xl font-bold mb-4">Introduction</h2>
							<p className="text-gray-600 leading-relaxed">
								Circus s'engage à protéger la vie privée de ses utilisateurs. Cette
								politique de confidentialité explique nos pratiques concernant la
								collecte, l'utilisation et la protection de vos données personnelles.
								En utilisant notre plateforme, vous acceptez les pratiques décrites
								dans ce document.
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

						<section className="bg-secondary rounded-2xl p-6 md:p-8">
							<h2 className="text-xl font-bold text-white mb-4">
								Modifications de la politique
							</h2>
							<p className="text-gray-400 leading-relaxed">
								Nous nous réservons le droit de modifier cette politique de
								confidentialité à tout moment. Toute modification sera publiée sur
								cette page et prendra effet immédiatement. Nous vous encourageons à
								consulter régulièrement cette page pour rester informé de nos
								pratiques en matière de confidentialité.
							</p>
						</section>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default Privacy;