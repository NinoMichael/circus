import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import DirectionIcon from "@mui/icons-material/DirectionsBusOutlined";
import MapIcon from "@mui/icons-material/MapOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";

import busError from "../../assets/images/busError.jpg";
import SEO from "../../components/seo/SEO";

const NotFound = () => {
	return (
		<>
			<SEO
				title="Page non trouvée"
				description="La page que vous recherchez n'existe pas. Retournez à l'accueil Circus pour réserver votre taxi-brousse."
				keywords="erreur 404, page non trouvée"
				url="/404"
			/>
			<div className="flex flex-col gap-y-8 justify-center items-center mx-auto p-8 sm:py-12 max-sm:w-full sm:min-w-xl">
			<div className="bg-gray-200 p-12 flex justify-center relative items-center rounded-xl max-sm:w-full sm:min-w-xl">
				<div className="relative">
					<img
						src={busError}
						alt="Bus image error"
						className="h-24 w-24 sm:h-36 sm:w-36 rounded-full object-cover"
					/>
					<span className="absolute -bottom-4 left-0 sm:left-6 bg-primary py-2 px-4 font-extrabold text-3xl rounded-full">
						404
					</span>
				</div>

				<DirectionIcon className="absolute top-8 left-8 size-10 sm:size-16 text-primary/40" />
				<MapIcon className="absolute bottom-8 right-8 size-10 sm:size-16 text-primary/40" />
			</div>

			<div className="text-center space-y-2 max-sm:w-full sm:max-w-lg">
				<h1 className="text-2xl sm:text-3xl font-extrabold">
					Oups ! Page non trouvée
				</h1>
				<p className="text-gray-400">
					Il semble que vous soyez perdu. Notre taxi-brousse a du prendre un
					mauvais virage.
				</p>

				<div className="mt-8 flex flex-col sm:flex-row gap-6 items-center">
					<Link to="/" className="w-full!">
						<Button
							className="w-full! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm! hover:scale-105! hover:transition-all!"
							startIcon={<HomeIcon />}
						>
							Retour à l'accueil
						</Button>
					</Link>
					<Button className="w-full! bg-accent! text-sm! hover:bg-accent/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm! hover:scale-105! hover:transition-all!">
						Signaler un problème
					</Button>
				</div>
			</div>

			<div className="mt-4 max-sm:w-full sm:min-w-xl flex flex-col sm:flex-row gap-8 items-center">
				<Link to="/" className="w-full">
					<div className="min-h-44 bg-white p-6 rounded-lg space-y-4 hover:scale-105 hover:transition-all">
						<SearchIcon className="size-5 text-primary" />
						<h3 className="font-bold">Rechercher</h3>
						<p>Trouvez un planning</p>
					</div>
				</Link>

				<Link to="/" className="w-full">
					<div className="min-h-44 bg-white p-6 rounded-lg space-y-4 hover:scale-105 hover:transition-all">
						<InfoIcon className="size-5 text-primary" />
						<h3 className="font-bold">Aide</h3>
						<p>Consultez notre foire aux questions</p>
					</div>
				</Link>
			</div>
		</div>
		</>		
	);
};

export default NotFound;
