import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import FlagIcon from "@mui/icons-material/FlagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";

import bannerImage from "../assets/images/banner-home.jpg";
import { cities } from "../assets/data/city";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	show: { opacity: 1, scale: 1 },
};

const Home = () => {
	return (
		<>
			<SEO
				title="Réservation taxi-brousse Madagascar"
				description="Réservez vos voyages régionaux en taxi-brousse à Madagascar. Circus connecte les voyageurs aux meilleures coopératives pour des trajets confortables et fiables."
				keywords="taxi-brousse madagascar, réservation bus, transport régional, voyage madagascar, antananarivo toamasina"
				url="/"
			/>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.35 }}
				className="min-h-screen"
			>
				<motion.div
					initial={{ opacity: 0, scale: 1.05 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="md:h-132 w-full bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center py-12 px-8 mx-auto"
					style={{ backgroundImage: `url(${bannerImage})` }}
				>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="md:max-w-4xl text-white text-center space-y-4"
					>
						<h1 className="text-3xl md:text-4xl font-extrabold leading-14">
							Bienvenue à Circus - Le réseau régional qui vous déplace, vite et
							sur
						</h1>
						<p className="text-lg">
							Réservez vos voyages régionaux en taxi-brousse sans complication
							tous les jours
						</p>
					</motion.div>

					<motion.form
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="max-md:w-full md:max-w-4xl mt-16 bg-white grid md:grid-cols-4 gap-4 items-end p-6 shadow rounded-xl"
					>
						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
								ville de départ
							</label>
							<div className="relative mt-4">
								<LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<Select className="h-11! pl-6! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary">
									<MenuItem className="text-sm" value={1}>
										Antananarivo
									</MenuItem>
									<MenuItem className="text-sm" value={0}>
										Toamasina
									</MenuItem>
								</Select>
							</div>
						</div>
						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
								ville d'arrivée
							</label>
							<div className="relative mt-4">
								<FlagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<Select className="h-11! pl-6! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary">
									<MenuItem className="text-sm" value={1}>
										Antananarivo
									</MenuItem>
									<MenuItem className="text-sm" value={0}>
										Toamasina
									</MenuItem>
								</Select>
							</div>
						</div>
						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
								Date de voyage
							</label>
							<div className="relative mt-4">
								<CalendarTodayOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<input
									type="date"
									placeholder="01/01/1990"
									className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
								/>
							</div>
						</div>
						<div className="max-md:mt-6">
							<Button
								startIcon={<SearchIcon />}
								className="w-full h-11 bg-primary text-sm hover:bg-primary/80 px-6 py-3 rounded-md font-bold transition-all shadow-sm"
							>
								Rechercher
							</Button>
						</div>
					</motion.form>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
					className="mt-16 mb-8 px-8 lg:px-16"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
					>
						<h3 className="text-lg tracking-widest uppercase text-primary font-medium">
							routes
						</h3>
						<h2 className="text-3xl font-extrabold">Destinations populaires</h2>
					</motion.div>

					<motion.div
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-50px" }}
						className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						{cities.map((city) => (
							<motion.div
								key={city.name}
								variants={cardVariants}
								whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
								className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
							>
								<img
									src={city.cover}
									alt={city.name}
									className="w-full h-48 object-cover"
								/>
								<span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
									{city.area}
								</span>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
									<h3 className="text-white text-lg font-semibold">
										{city.name}
									</h3>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
};

export default Home;
