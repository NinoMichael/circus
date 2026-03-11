import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticIcon from "@mui/icons-material/Analytics";
import DirectionBusIcon from "@mui/icons-material/DirectionsBus";
import SettingIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const SidebarDriver = () => {
	const navigateTo = useNavigate();
	const [logoutDialog, setLogoutDialog] = useState(false);
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		await logout();
		navigateTo("/");
	};

	return (
		<aside className="hidden lg:w-72 border-r border-primary/20 bg-white/80 p-8 lg:flex flex-col justify-between">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-start text-left gap-1 mb-4">
					<p className="text-lg font-bold">{user?.fullname}</p>
					<p className="text-text/60 text-sm font-medium">
						Chauffeur • ID #{user?.driver?.id}
					</p>
				</div>

				<nav className="flex flex-col gap-8">
					<Link
						className="hover:text-primary transition-colors flex gap-2 items-center"
						to="/driver/overview"
					>
						<DashboardIcon className="opacity-80!" />
						<span>Tableau de bord</span>
					</Link>
					<Link
						className="hover:text-primary transition-colors flex gap-2 items-center"
						to="/"
					>
						<CalendarMonthIcon className="opacity-80!" />
						<span>Planning</span>
					</Link>
					<Link
						className="hover:text-primary transition-colors flex gap-2 items-center"
						to="/"
					>
						<AnalyticIcon className="opacity-80!" />
						<span>Performance</span>
					</Link>
					<Link
						className="hover:text-primary transition-colors flex gap-2 items-center"
						to="/"
					>
						<DirectionBusIcon className="opacity-80!" />
						<span>Taxi-brousse</span>
					</Link>
					<Link
						className="hover:text-primary transition-colors flex gap-2 items-center"
						to="/"
					>
						<SettingIcon className="opacity-80!" />
						<span>Paramètres</span>
					</Link>
				</nav>
			</div>

			<div className="mt-12">
				<Divider />

				<Button
					className="bg-secondary! text-accent! mt-6! w-full! text-sm! py-3!"
					startIcon={<LogoutIcon />}
					onClick={() => setLogoutDialog(true)}
				>
					Déconnexion
				</Button>

				<Dialog
					sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "60%" } }}
					maxWidth="xs"
					open={logoutDialog}
				>
					<DialogTitle className="text-xl! text-secondary! font-bold!">
						Déconnexion
					</DialogTitle>
					<DialogContent>
						<p className="my-4">Etes-vous sur de vouloir vous déconnecter ?</p>
					</DialogContent>
					<DialogActions className="!mt-6">
						<Button
							className="bg-accent! w-full! text-sm! py-3!"
							autoFocus
							onClick={() => setLogoutDialog(false)}
						>
							Non
						</Button>
						<Button
							className="bg-primary! w-full! text-sm! py-3!"
							onClick={handleLogout}
						>
							Oui
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</aside>
	);
};

export default SidebarDriver;
