import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../inc/Logo";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import NotificationIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticIcon from "@mui/icons-material/Analytics";
import DirectionBusIcon from "@mui/icons-material/DirectionsBus";
import SettingIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const TopbarDriver = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const DrawerMenu = (
		<Box
			className="w-64! space-y-8! p-8! flex! flex-col! justify-between!"
			role="presentation"
			onClick={toggleDrawer(false)}
		>
			<Logo />

			<div className="mt-4 flex flex-col items-start text-left gap-1 mb-4">
				<p className="text-lg font-bold">Tantely Ny Aina</p>
				<p className="text-text/60 text-sm font-medium">Chauffeur • ID #89</p>
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

			<div className="mt-12">
				<Divider />

				<Button
					className="bg-secondary! text-accent! mt-12! w-full! text-sm! py-3!"
					startIcon={<LogoutIcon />}
				>
					Déconnexion
				</Button>

				<nav className="mt-16 flex flex-wrap items-center gap-4 text-xs!">
					<Link
						className="font-light hover:text-primary transition-colors"
						to="/"
					>
						Confidentialité
					</Link>
					<Link
						className="font-light hover:text-primary transition-colors"
						to="/"
					>
						Conditions d'utilisation
					</Link>
					<Link
						className="font-light hover:text-primary transition-colors"
						to="/"
					>
						FAQ
					</Link>
					<Link
						className="font-light hover:text-primary transition-colors"
						to="/"
					>
						Aide
					</Link>
				</nav>
			</div>
		</Box>
	);

	return (
		<header>
			<header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/20 bg-white/80 px-4 md:px-8 py-4 lg:px-16">
				<div className="flex gap-4">
					<Button className="lg:hidden! p-0!" onClick={toggleDrawer(true)}>
						<MenuIcon />
					</Button>

					<Drawer open={open} onClose={toggleDrawer(false)}>
						{DrawerMenu}
					</Drawer>

					<div className="hidden sm:block">
						<Logo />
					</div>
				</div>

				<div className="flex items-center gap-4 lg:gap-6">
					<div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 text-xs font-semibold uppercase tracking-wider">
						<span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
						En service
					</div>
					<div className="flex gap-2">
						<Button title="Notification">
							<NotificationIcon className="opacity-80! text-lg!" />
						</Button>
					</div>
					<div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
						<img
							alt="Driver profile"
							className="h-full w-full object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXPUDt8CTAdNqS7nPIgriAAQ0tJyHNKBOPJLEOwcQgOGL_aN618T5Z9vBCE9K-QltWFsKjMhTOsghoiUir4XnXLbnJjcNozyFtCpQO12-RAK5arBkmsaATdx1Wki_TrJUwLTMVMVQOJDuAplMqCjucplePR2PT0jF9jMgoQlTWJnnhCBqvssQS_DaXjH9Tt9GCoo4qxRou2OslDGs3peDs4vdffR3a8pFlq25PV167Wb7DeSadHCBSeFjdFVJABlUVjfcwKEZjxCk"
						/>
					</div>
				</div>
			</header>
		</header>
	);
};

export default TopbarDriver;
