import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, type Variants } from "framer-motion";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRegisterCooperativeStore } from "../../../hooks/useAuth";
import busImage from "../../../assets/images/bus-img.jpg";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SEO from "../../../components/seo/SEO";

const Join = () => {
	const navigate = useNavigate();
	const { form, setStep1 } = useRegisterCooperativeStore();
	const handleChange = (field: string, value: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setStep1({ ...form, [field]: value } as any);
	};

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
	};

	const pageTransition = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		navigate("/register-cooperative/info");
	};
	return (
		<>
			<SEO
				title="Devenir partenaire coopérative"
				description="Rejoignez le réseau Circus en tant que coopérative de transport partenaire. Digitalisez vos ventes et augmentez votre visibilité."
				keywords="devenir partenaire, coopérative transport, inscription coopérative"
				url="/register-cooperative"
			/>
			<motion.div
				className="min-h-screen flex items-center justify-center py-16 px-8 lg:px-16"
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageTransition}
				transition={{ duration: 0.35 }}
			>
				<div className="w-full grid md:grid-cols-2 items-center lg:mx-10">
					<div className="hidden md:block">
						<div className="bg-white p-1 rounded-md shadow-md">
							<img
								src={busImage}
								alt="Bus"
								className="w-full min-h-screen object-cover rounded-md"
							/>
						</div>
					</div>

					<div className="md:px-10">
						<div className="space-y-5">
							<p className="uppercase text-xs font-bold bg-primary/30 px-4 py-1 rounded-full inline-block">
								espace professionnel
							</p>
							<h1 className="text-4xl font-extrabold">Devenir partenaire</h1>
							<p className="text-text/50 mb-6">
								Rejoignez le réseau Circus et faites évoluer votre coopérative
								vers le transport connecté avec une meilleure gestion
							</p>
						</div>
						<form className="space-y-5" onSubmit={handleSubmit}>
							<div className="space-y-2">
								<label className="block font-medium">
									Nom de la coopérative
								</label>
								<div className="relative">
									<BusinessOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="text"
										placeholder="Sonatra"
										value={form.name ?? ""}
										onChange={(e) => handleChange("name", e.target.value)}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label className="block font-medium">Email professionnel</label>
								<div className="relative">
									<EmailOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="email"
										placeholder="contact@coop.fr"
										value={form.contact_email ?? ""}
										onChange={(e) =>
											handleChange("contact_email", e.target.value)
										}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label className="block font-medium">
									Téléphone professionnel
								</label>
								<div className="relative">
									<LocalPhoneOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="tel"
										placeholder="06 12 34 56 78"
										value={form.contact_phone ?? ""}
										onChange={(e) =>
											handleChange("contact_phone", e.target.value)
										}
										className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
										required
									/>
								</div>
							</div>
							<motion.div
								variants={item}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
							>
								<Button
									className="mt-8! w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
									type="submit"
								>
									Suivant <ArrowForwardIcon className="ml-2" />
								</Button>
							</motion.div>
						</form>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default Join;
