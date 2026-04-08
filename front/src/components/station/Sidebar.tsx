import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingIcon from "@mui/icons-material/Settings";
import DomainIcon from "@mui/icons-material/Domain";

const SidebarStation = () => {
	const navigateTo = useNavigate();
	const location = useLocation();
	const [logoutDialog, setLogoutDialog] = useState(false);
	const { user, logout } = useAuth();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	const handleLogout = async () => {
		await logout();
		navigateTo("/");
	};

	return (
		<aside className="hidden lg:flex lg:w-72 border-r border-primary/20 bg-white/80 p-8 flex-col justify-between overflow-y-auto">
			<div className="flex flex-col gap-6">
				<div className="flex pb-8 border-b border-gray-200 gap-3 items-center">
					<div className="bg-primary p-1.5 rounded-lg">
						<TravelExploreIcon className="font-bold" />
					</div>
					<div className="space-y-1">
						<h3 className="font-extrabold tracking-tight">Circus</h3>
						<span className="opacity-50 font-semibold tracking-widest uppercase text-xs">
							{user?.station?.name + " " + user?.station?.city}
						</span>
					</div>
				</div>

				<nav className="mt-4 flex flex-col gap-4">
					<Link
						className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
							isActive("/station/dashboard")
								? "bg-primary"
								: "hover:text-primary"
						}`}
						to="/station/dashboard"
					>
						<DashboardIcon className="opacity-80!" />
						<span>Tableau de bord</span>
					</Link>
					<Link
						className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
							isActive("/station/analytics")
								? "bg-primary"
								: "hover:text-primary"
						}`}
						to="/station/analytics"
					>
						<BarChartIcon className="opacity-80!" />
						<span>Analytique</span>
					</Link>
					<Link
						className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
							isActive("/station/cooperative")
								? "bg-primary"
								: "hover:text-primary"
						}`}
						to="/station/cooperative"
					>
						<DomainIcon className="opacity-80!" />
						<span>Coopérative</span>
					</Link>
					<Link
						className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
							isActive("/station/settings")
								? "bg-primary"
								: "hover:text-primary"
						}`}
						to="/station/settings"
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

export default SidebarStation;
