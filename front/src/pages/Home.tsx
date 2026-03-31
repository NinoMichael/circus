import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";
import { useStation } from "../hooks/useStation";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import FlagIcon from "@mui/icons-material/FlagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBusOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
	const navigate = useNavigate();
	const { fetchCities } = useStation();
	const [apiCities, setApiCities] = useState<string[]>([]);

	const [selectedDeparture, setSelectedDeparture] = useState("");
	const [selectedArrival, setSelectedArrival] = useState("");
	const [selectedDate, setSelectedDate] = useState("");

	useEffect(() => {
		const loadCities = async () => {
			const data = await fetchCities();
			if (data) {
				setApiCities(data);
			}
		};
		loadCities();
	}, [fetchCities]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (selectedDeparture) params.set("departure", selectedDeparture);
		if (selectedArrival) params.set("arrival", selectedArrival);
		if (selectedDate) params.set("date", selectedDate);
		navigate(`/trips?${params.toString()}`);
	};

	const handleCityClick = (cityName: string) => {
		navigate(`/trips?arrival=${encodeURIComponent(cityName)}`);
	};

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
						onSubmit={handleSearch}
						className="max-md:w-full md:max-w-4xl mt-16 bg-white grid md:grid-cols-4 gap-4 items-end p-6 shadow rounded-xl"
					>
						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
								ville de départ
							</label>
							<div className="relative mt-4">
								<LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<Select
									value={selectedDeparture}
									onChange={(e) => setSelectedDeparture(e.target.value)}
									displayEmpty
									className="h-11! pl-6! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
								>
									<MenuItem className="text-sm" value="">
										<span className="text-gray-400">Sélectionner</span>
									</MenuItem>
									{apiCities.map((city) => (
										<MenuItem key={city} className="text-sm" value={city}>
											{city}
										</MenuItem>
									))}
								</Select>
							</div>
						</div>
						<div>
							<label className="tracking-widest text-text/70 uppercase text-xs md:text-sm">
								ville d'arrivée
							</label>
							<div className="relative mt-4">
								<FlagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
								<Select
									value={selectedArrival}
									onChange={(e) => setSelectedArrival(e.target.value)}
									displayEmpty
									className="h-11! pl-6! pr-4! rounded-lg! text-sm! w-full! border-secondary/30! focus-within:ring-primary! focus-within:border-primary! focus:ring-primary"
								>
									<MenuItem className="text-sm" value="">
										<span className="text-gray-400">Sélectionner</span>
									</MenuItem>
									{apiCities.map((city) => (
										<MenuItem key={city} className="text-sm" value={city}>
											{city}
										</MenuItem>
									))}
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
									value={selectedDate}
									onChange={(e) => setSelectedDate(e.target.value)}
									className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-none duration-200 transition-all"
								/>
							</div>
						</div>
						<div className="max-md:mt-6">
							<Button
								type="submit"
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
								onClick={() => handleCityClick(city.name)}
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

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
					className="mt-8 mb-16 px-8 lg:px-16"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
						className="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
					>
						<div className="flex-1 text-center md:text-left">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
								<DirectionsBusIcon className="size-10 text-primary" />
							</div>
							<h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
								Explorez les trajets à venir
							</h2>
							<p className="text-white/80 text-lg mb-6 max-w-xl">
								Découvez tous les voyages disponibles pour vos prochains
								déplacements. Trouvez le trajet qui correspond à vos besoins.
							</p>
							<Button
								onClick={() => navigate("/trips")}
								endIcon={<ArrowForwardIcon />}
								className="bg-primary text-secondary hover:bg-primary/80 px-8 py-3 rounded-lg font-bold transition-all"
							>
								Voir tous les plannings
							</Button>
						</div>
						<div className="hidden md:block">
							<div className="relative">
								<div className="w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center">
									<DirectionsBusIcon className="size-24 text-primary" />
								</div>
								<div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full"></div>
								<div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/40 rounded-full"></div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
};

export default Home;
