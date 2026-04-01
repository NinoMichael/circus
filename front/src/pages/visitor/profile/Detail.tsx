import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pageTransition } from "../../../lib/utils/animation";
import { useAuth } from "../../../hooks/useAuth";
import { formatDateLong } from "../../../lib/utils/date";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import PersonIcon from "@mui/icons-material/PersonOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUserOutlined";
import VerifiedIcon from "@mui/icons-material/VerifiedOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/LockOutlined";
import AlertIcon from "@mui/icons-material/NotificationsOutlined";
import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import BlockIcon from "@mui/icons-material/BlockOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";

const DetailProfileVisitor = () => {
	const { user } = useAuth();

	return (
		<motion.div
			className="min-h-screen py-12 px-8 lg:px-16"
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
				<div className="space-y-2">
					<h1 className="text-3xl font-extrabold">Profil visiteur</h1>
					<span className="opacity-60">
						Gérez vos informations personnelles et les paramètres de votre
						compte
					</span>
				</div>

				<Link to="/profile/edit">
					{" "}
					<Button
						className="w-48! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
						startIcon={<EditIcon />}
					>
						Modifier le profil
					</Button>
				</Link>
			</div>

			<div className="mt-8 grid md:grid-cols-3 gap-8">
				<div className="md:col-span-2 flex flex-col gap-8">
					<div className="bg-white rounded-lg shadow py-6">
						<h2 className="px-6">
							<PersonIcon className="text-primary mr-2 size-7 -mt-2" />
							<span className="text-xl font-bold">
								Informations personnelles
							</span>
						</h2>

						<Divider className="!mt-4 mb-8" />

						<div className="grid sm:grid-cols-2 items-center gap-8 px-6">
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									nom
								</label>
								<p className="mt-1.5">{user?.lastname}</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									prénoms
								</label>
								<p className="mt-1.5">{user?.firstname}</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									email
								</label>
								<p className="mt-1.5">{user?.email}</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									téléphone
								</label>
								<p className="mt-1.5">{user?.phone}</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									date de naissance
								</label>
								<p className="mt-1.5">
									{formatDateLong(user?.profile.birth_date || "")}
								</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									numéro cin
								</label>
								<p className="mt-1.5">{user?.profile.national_id}</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									adresse
								</label>
								<p className="mt-1.5">{user?.profile.address}</p>
							</div>
							<div>
								<label className="text-xs font-bold tracking-widest uppercase opacity-50">
									sexe
								</label>
								<p className="mt-1.5">
									{user?.profile.is_male === false ? "Féminin" : "Masculin"}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
						<div className="flex gap-4 items-center">
							<VerifiedUserIcon className="bg-primary/20 p-2 rounded-full size-10 text-primary" />
							<div className="space-y-1">
								<h4 className="font-bold text-lg">Vérification du compte</h4>
								<p className="opacity-60">
									{!user?.email_verified_at
										? `Votre profil n'est pas encore vérifié`
										: `Votre profil est vérifié depuis le ${formatDateLong(
												user.email_verified_at
										  )}`}
								</p>
							</div>
						</div>

						<div>
							{!user?.email_verified_at ? (
								<Button
									className="w-64 md:w-full cursor-pointer bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
									startIcon={<VerifiedUserIcon />}
								>
									Vérifier le compte
								</Button>
							) : (
								<VerifiedIcon className="text-green-600 size-10" />
							)}
						</div>
					</div>
				</div>

				<div className="md:col-span-1 flex flex-col gap-8">
					<div className="bg-white rounded-lg shadow flex flex-col gap-4 py-4">
						<h3 className="px-6">
							<PersonIcon className="text-primary mr-2 size-7 -mt-2" />
							<span className="text-xl font-bold">Paramètres du compte</span>
						</h3>

						<Divider className="mt-2 mb-4" />

						<div className="px-6 flex justify-between gap-4 items-center hover:scale-105 cursor-pointer hover:transition-all hover:duration-300">
							<div>
								<LockIcon className="opacity-60 size-5 mr-2 -mt-1.5" />
								<span>Changer le mot de passe</span>
							</div>
							<ArrowForwardIcon className="opacity-60 size-5" />
						</div>

						<div className="mt-4 px-6 flex justify-between gap-4 items-center hover:scale-105 cursor-pointer hover:transition-all hover:duration-300">
							<div>
								<AlertIcon className="opacity-60 size-5 mr-2 -mt-1.5" />
								<span>Préférences de notification</span>
							</div>
							<ArrowForwardIcon className="opacity-60 size-5" />
						</div>

						<div className="mt-4 px-6 flex justify-between gap-4 items-center hover:scale-105 cursor-pointer hover:transition-all hover:duration-300">
							<div>
								<LanguageIcon className="opacity-60 size-5 mr-2 -mt-1.5" />
								<span>Langues</span>
							</div>
							<ArrowForwardIcon className="opacity-60 size-5" />
						</div>

						<Divider className="mt-4 mb-4" />

						<div className="px-6 flex flex-col gap-6">
							<Link to="/profile/deactivate" className="text-red-600">
								<BlockIcon className="size-5 -mt-1.5 mr-2" />
								<span className="font-medium">Désactiver le compte</span>
							</Link>
							<Link to="/profile/delete" className="text-red-600">
								<DeleteIcon className="size-5 -mt-1.5 mr-2" />
								<span className="font-medium">Supprimer le compte</span>
							</Link>
						</div>
					</div>

					<div className="relative bg-secondary rounded-lg shadow p-6 text-white space-y-3">
						<h4 className="text-lg font-bold">Besoin d'aide ?</h4>
						<p className="opacity-80 text-sm font-light">
							Notre équipe de support est disponible 24/7 pour répondre à toutes
							vos questions
						</p>
						<Button className="mt-2 bg-primary! text-xs! tracking-widest uppercase hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!">
							Contacter le support
						</Button>
						<div className="absolute -bottom-4 -right-4 opacity-20">
							<InfoIcon className="size-24" />
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default DetailProfileVisitor;
