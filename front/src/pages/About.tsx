import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useDashboard } from "../hooks/useDashboard";
import type { KPIAboutResponse } from "../lib/types/dashboard";

import heroImage from "../assets/images/hero-img.jpg";

import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const About = () => {
	const [kpi, setKpi] = useState<KPIAboutResponse>();
	const { fetchKpisAbout, loading } = useDashboard();

	const formatCount = (value: number): string => {
		if (value >= 1000) {
			const k = value / 1000;
			return `${Number.isInteger(k) ? k : k.toFixed(1)}k`;
		}
		return `${value}`;
	};

	useEffect(() => {
		const loadKpi = async () => {
			const data = await fetchKpisAbout();
			if (data) {
				setKpi(data);
			}
		};

		loadKpi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const stats = [
		{
			icon: FmdGoodOutlinedIcon,
			value: loading ? "..." : `${formatCount(kpi?.city_count ?? 0)}+`,
			label: "VILLES DESSERVIES",
		},
		{
			icon: HandshakeOutlinedIcon,
			value: loading ? "..." : formatCount(kpi?.cooperative_count ?? 0),
			label: "COOPÉRATIVES",
		},
		{
			icon: SentimentVerySatisfiedOutlinedIcon,
			value: formatCount(15000),
			label: "VOYAGEURS SATISFAITS",
		},
	];

	const steps = [
		{
			icon: ExploreOutlinedIcon,
			title: "Choisissez votre itinéraire",
			description:
				"Parcourez nos nombreuses plannings de voyage à travers Madagascar.",
		},
		{
			icon: AirlineSeatReclineNormalIcon,
			title: "Réservez votre siège",
			description:
				"Sélectionnez la place qui vous convient pour un trajet tout confort.",
		},
		{
			icon: PaymentsOutlinedIcon,
			title: "Payez en toute sécurité",
			description:
				"Transactions sécurisées par Mobile Money, espèces ou carte bancaire.",
		},
	];

	const benefits = [
		"Gestion d'inventaire en temps réel",
		"Paiements garantis et sécurisés",
		"Support technique 24/7",
	];

	const faqs = [
		{
			q: "Comment annuler ma réservation ?",
			a: "Vous pouvez annuler votre réservation jusqu'à 2 heures avant le départ via l'application ou en contactant notre support.",
		},
		{
			q: "Puis-je choisir mon siège spécifique ?",
			a: "Oui, lors de la réservation vous pouvez sélectionner le siège de votre choix parmi les places disponibles.",
		},
		{
			q: "Quels sont les modes de paiement acceptés ?",
			a: "Nous acceptons Mobile Money (MVola, Orange Money, Airtel Money), les cartes bancaires et le paiement en espèces.",
		},
		{
			q: "Quels documents dois-je présenter au départ ?",
			a: "Présentez votre confirmation de réservation (SMS ou email) ainsi qu'une pièce d'identité valide.",
		},
	];

	const pageTransition = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	};

	const sectionVariants: Variants = {
		hidden: { opacity: 0, y: 40 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const containerVariants: Variants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.12,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 20, scale: 0.98 },
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.4 },
		},
	};

	return (
		<motion.div
			className="min-h-screen -mt-12 -mx-8 lg:-mx-16"
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<section className="relative h-screen overflow-hidden">
				<img
					src={heroImage}
					alt="Paysage de Madagascar"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/50" />
				<div className="px-8 md:px-0 relative z-10 w-full h-screen flex flex-col justify-center items-center">
					<motion.div
						className="items-start"
						initial="hidden"
						animate="show"
						variants={containerVariants}
					>
						<motion.span
							variants={itemVariants}
							className="inline-block bg-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 w-fit"
						>
							À propos
						</motion.span>
						<motion.h1
							variants={itemVariants}
							className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-6"
						>
							Votre allié des transports régionaux
						</motion.h1>
						<motion.p
							variants={itemVariants}
							className="text-white/80 text-lg max-w-3xl leading-relaxed"
						>
							Circus connecte les voyageurs aux meilleures coopératives pour une
							expérience de transport premium, fiable et élégante à travers les
							22 régions.
						</motion.p>
					</motion.div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="container mx-auto px-6">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
					>
						{stats.map((stat) => (
							<motion.div
								key={stat.label}
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								className="flex flex-col items-center gap-3"
							>
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
									<stat.icon className="w-6 h-6 text-primary" />
								</div>
								<span className="text-3xl font-bold">{stat.value}</span>
								<span className="text-sm text-gray-500 font-semibold uppercase">
									{stat.label}
								</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			<section className="py-16 bg-background">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-2">
						Nos partenaires de confiance
					</h2>
					<div className="w-12 h-1 bg-primary mx-auto mt-4 mb-12 rounded-full" />
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mx-auto"
					>
						{loading
							? Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className="bg-gray-200/60 rounded-xl px-6 py-14 flex flex-col items-center gap-3 animate-pulse"
									>
										<div className="w-14 h-14 rounded-full bg-gray-300" />
										<div className="h-3 w-16 bg-gray-300 rounded" />
									</div>
							  ))
							: kpi?.cooperatives.map((coop) => (
									<motion.div
										key={coop.id ?? coop.name}
										variants={itemVariants}
										whileHover={{ scale: 1.05, y: -5 }}
										className="bg-gray-200/60 rounded-xl px-6 py-14 flex flex-col items-center gap-3 hover:shadow-md shadow-sm transition-shadow"
									>
										<div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
											{coop.logo ? (
												<img
													src={coop.logo}
													alt={coop.name}
													className="w-8 h-8 object-contain"
												/>
											) : (
												<BusinessIcon className="w-5 h-5" />
											)}
										</div>
										<span className="font-semibold text-sm">{coop.name}</span>
									</motion.div>
							  ))}
					</motion.div>
				</div>
			</section>

			<section className="py-20 bg-white">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-2">
						Comment ça marche
					</h2>
					<p className="text-gray-400 mb-12">
						Une expérience de réservation simplifiée en trois étapes intuitives.
					</p>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-36 max-w-6xl mx-auto relative"
					>
						<div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gray-200 z-0" />
						{steps.map((step, i) => (
							<motion.div
								key={i}
								variants={itemVariants}
								whileHover={{ y: -6 }}
								className="flex flex-col items-center gap-4 relative z-10"
							>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 3 }}
									className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
								>
									<step.icon className="w-6 h-6" />
								</motion.div>
								<h3 className="font-bold">{step.title}</h3>
								<p className="text-sm text-gray-400 text-center max-w-xs">
									{step.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			<section className="py-20 bg-background">
				<div className="container mx-auto px-6">
					<motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="bg-secondary rounded-2xl px-10 py-20 md:px-20 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
					>
						<div className="max-w-lg">
							<h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white max-w-sm">
								Vous êtes une coopérative de transport ?
							</h2>
							<p className="text-gray-400 mb-6 leading-relaxed">
								Rejoignez notre plateforme et digitalisez vos ventes. Augmentez
								votre visibilité et offrez un service premium à vos clients.
							</p>
							<ul className="space-y-3">
								{benefits.map((b) => (
									<motion.li
										key={b}
										variants={itemVariants}
										initial="hidden"
										whileInView="show"
										viewport={{ once: true }}
										className="flex items-center gap-3 text-gray-400 text-sm"
									>
										<CheckCircleOutlineOutlinedIcon className="w-5 h-5 flex-shrink-0 text-primary" />
										{b}
									</motion.li>
								))}
							</ul>
						</div>
						<motion.div
							variants={item}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
						>
							<button className="bg-primary font-bold px-14 py-4 rounded-xl text-sm whitespace-nowrap shadow-2xl cursor-pointer">
								Devenir partenaire
							</button>
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className="py-20 bg-white">
				<div className="container mx-auto px-6 max-w-2xl text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-2">
						Questions fréquentes
					</h2>
					<p className="text-gray-400 mb-10">
						Tout ce que vous devez savoir pour votre prochain voyage.
					</p>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="text-left space-y-3"
					>
						{faqs.map((faq, i) => (
							<motion.div key={i} variants={itemVariants}>
								<MuiAccordion
									disableGutters
									elevation={0}
									className="border border-gray-200 rounded-xl bg-background overflow-hidden"
								>
									<MuiAccordionSummary
										expandIcon={<AddOutlinedIcon className="text-gray-500" />}
										className="px-4 py-2"
									>
										<span className="text-sm font-semibold">{faq.q}</span>
									</MuiAccordionSummary>
									<MuiAccordionDetails className="px-4 pb-4">
										<span className="text-sm leading-relaxed">{faq.a}</span>
									</MuiAccordionDetails>
								</MuiAccordion>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</motion.div>
	);
};

export default About;
