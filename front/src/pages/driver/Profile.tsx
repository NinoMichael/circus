import { useAuth } from "../../hooks/useAuth";

import Button from "@mui/material/Button";

import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";

import { formatDateLong, formatSlashDate } from "../../lib/utils/date";

const ProfileDriver = () => {
	const { user } = useAuth();

	return (
		<div className="flex flex-col items-start gap-8">
			<div className="flex p-8 flex-col items-start rounded-3xl border border-secondary/10 bg-white shadow-black/30 w-full overflow-hidden relative">
				<div className="absolute left-px top-px bg-tertiary/20 w-full h-32"></div>
				<div className="flex flex-col min-[450px]:flex-row pt-12 min-[450px]:items-end gap-6 w-full">
					{!user?.profile.avatar ? (
						<div className="bg-primary flex justify-center items-center rounded-3xl border-3 border-accent md:w-36 md:h-36 max-w-none">
							{user?.firstname.charAt(0)}
						</div>
					) : (
						<img
							src={user?.profile.avatar}
							className="flex justify-center items-center rounded-3xl border-3 border-accent w-28 h-28 md:w-36 md:h-36 max-w-none"
							alt="Avatar user"
						/>
					)}

					<div className="flex flex-col items-start -space-y-px w-full">
						<div className="flex flex-col items-start w-full">
							<p className="text-2xl md:text-3xl font-bold leading-10 md:leading-12 w-full">
								{user?.fullname}
							</p>
						</div>
						<div className="flex items-center gap-2 w-full">
							<VerifiedIcon className="size-6! text-primary!" />
							<p className="flex flex-col justify-center opacity-60 font-medium leading-6 h-6">
								Chauffeur
							</p>
						</div>
						<div className="mt-4 md:hidden w-fit">
							<Button
								className="md:w-48! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
								startIcon={<EditIcon />}
							>
								Modifier le profil
							</Button>
						</div>
					</div>
					<div className="hidden md:flex pb-2 items-start w-fit">
						<Button
							className="md:w-48! bg-primary! text-sm! hover:bg-primary/80! px-6! py-3! rounded-md font-bold! transition-all! shadow-sm!"
							startIcon={<EditIcon />}
						>
							Modifier le profil
						</Button>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-8 w-full">
				<div className="md:col-span-2 flex flex-col items-start gap-8">
					<div className="flex p-8 flex-col items-start gap-6 rounded-3xl border border-accent bg-white shadow-black/30 w-full">
						<div className="flex items-center gap-2 w-full">
							<PersonIcon className="size-6! text-primary!" />
							<div className="flex flex-col items-start w-fit">
								<p className="flex flex-col justify-center text-secondary text-xl font-bold leading-7">
									Informations personnelles
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-6 w-full relative">
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start w-full">
									<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
										Nom
									</p>
								</div>
								<div className="flex flex-col items-start w-full">
									<p className="font-medium leading-6 w-full">
										{user?.lastname}
									</p>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start w-full">
									<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
										Prénoms
									</p>
								</div>
								<div className="flex flex-col items-start w-full">
									<p className="font-medium leading-6 w-full">
										{user?.firstname}
									</p>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start w-full">
									<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
										Sexe
									</p>
								</div>
								<div className="flex flex-col items-start w-full">
									<p className="font-medium leading-6 w-full">
										{user?.profile.is_male ? "Masculin" : "Féminin"}
									</p>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start w-full">
									<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
										Date de naissance
									</p>
								</div>
								<div className="flex flex-col items-start w-full">
									<p className="font-medium leading-6 w-full">
										{user?.profile.birth_date
											? formatDateLong(user.profile.birth_date)
											: "-"}
									</p>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-2 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start w-full">
									<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
										Adresse de résidence
									</p>
								</div>
								<div className="flex flex-col items-start w-full">
									<p className="font-medium leading-6 w-full">
										{user?.profile.address}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex p-8 flex-col items-start gap-6 rounded-3xl border border-accent bg-white shadow-black/30 w-full">
						<div className="flex items-center gap-2 w-full">
							<BadgeIcon className="size-6! text-primary!" />
							<div className="flex flex-col items-start w-fit">
								<p className="flex flex-col justify-center text-secondary text-xl font-bold leading-7">
									Identité &amp; coordonnées
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-6 w-full relative">
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start gap-1">
									<div className="flex flex-col items-start w-full">
										<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
											Email
										</p>
									</div>
									<div className="flex flex-col items-start w-full">
										<p className="font-medium leading-6 w-full">
											{user?.email}
										</p>
									</div>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start gap-1">
									<div className="flex flex-col items-start w-full">
										<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
											Téléphone
										</p>
									</div>
									<div className="flex flex-col items-start w-full">
										<p className="font-medium leading-6 w-full">
											{user?.phone || "-"}
										</p>
									</div>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start gap-1">
									<div className="flex flex-col items-start w-full">
										<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
											Numéro d'identité nationale
										</p>
									</div>
									<div className="flex flex-col items-start w-full">
										<p className="font-medium leading-6 w-full">
											{user?.profile.national_id}
										</p>
									</div>
								</div>
							</div>
							<div className="col-span-2 min-[450px]:col-span-1 flex flex-col items-start gap-1">
								<div className="flex flex-col items-start gap-1">
									<div className="flex flex-col items-start w-full">
										<p className="text-secondary/40 text-sm font-bold leading-4 w-full tracking-wide">
											N° Permis de conduire
										</p>
									</div>
									<div className="flex flex-col items-start w-full">
										<p className="font-medium leading-6 w-full">
											{user?.driver?.license_number}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="md:col-span-1 flex flex-col items-start gap-8 h-full">
					<div className="flex p-6 flex-col items-start gap-4 rounded-3xl bg-secondary w-full relative">
						<div className="absolute rounded-3xl bg-white shadow-sm w-72"></div>
						<div className="flex flex-col items-start opacity-80 w-full">
							<p className="text-white text-lg font-bold leading-7 w-full">
								Aperçu professionnel
							</p>
						</div>
						<div className="flex flex-col items-start gap-4 w-full">
							<div className="flex gap-6 justify-between items-center w-full">
								<div className="flex flex-col items-start opacity-60 w-fit">
									<p className="flex flex-col justify-center text-white text-sm leading-5">
										Adhésion
									</p>
								</div>
								<div className="flex flex-col items-start w-fit">
									<p className="flex flex-col justify-center text-white font-bold leading-6">
										{user?.driver?.created_at
											? formatSlashDate(user.driver.created_at)
											: "-"}
									</p>
								</div>
							</div>
							<div className="bg-white/30 w-full h-px"></div>
							<div className="flex gap-6 justify-between items-center w-full">
								<div className="flex flex-col items-start opacity-60 w-fit">
									<p className="flex flex-col justify-center text-white text-sm leading-5">
										Trajets terminés
									</p>
								</div>
								<div className="flex flex-col items-start w-fit">
									<p className="flex flex-col justify-center text-white font-bold leading-6">
										120
									</p>
								</div>
							</div>
							<div className="bg-white/30 w-full h-px"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileDriver;
