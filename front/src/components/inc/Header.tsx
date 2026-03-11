import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Logo from "./Logo";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationIcon from "@mui/icons-material/Notifications";

const Header = () => {
	// const apiUrl = import.meta.env.VITE_API_URL;

	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const { user } = useAuth();

	const handleLogin = () => {
		navigate("/login");
	};

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

			<nav className="flex flex-col gap-8">
				<Link className="hover:text-primary transition-colors" to="/">
					Accueil
				</Link>
				<Link className="hover:text-primary transition-colors" to="/about">
					À propos
				</Link>
				<Link className="hover:text-primary transition-colors" to="/contact">
					Contact
				</Link>
			</nav>

			<div className="mt-36">
				<Divider />

				<nav className="mt-8 flex flex-wrap items-center gap-4 text-xs!">
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
		<header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/20 px-4 md:px-8 lg:px-16 py-4">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex gap-4">
					<Button className="md:hidden! p-0!" onClick={toggleDrawer(true)}>
						<MenuIcon />
					</Button>

					<Drawer open={open} onClose={toggleDrawer(false)}>
						{DrawerMenu}
					</Drawer>

					<div className="hidden sm:block">
						<Logo />
					</div>
				</div>

				<div className="flex gap-16">
					<nav className="hidden md:flex items-center gap-12">
						<Link className="hover:text-primary transition-colors" to="/">
							Accueil
						</Link>
						<Link className="hover:text-primary transition-colors" to="/about">
							À propos
						</Link>
						<Link
							className="hover:text-primary transition-colors"
							to="/contact"
						>
							Contact
						</Link>
					</nav>

					{!user ? (
						<Button
							className="bg-primary! text-sm! hover:bg-primary/80! px-6! py-2.5! rounded-xl! font-bold! transition-all! shadow-sm!"
							startIcon={<PersonIcon />}
							onClick={handleLogin}
						>
							Connexion
						</Button>
					) : (
						<div className="flex gap-4 items-center">
							<Button
								className="hover:text-primary! transition-all!"
								startIcon={<NotificationIcon />}
								title="Notifications"
							/>
							{!user.profile.avatar ? (
								<div className="bg-primary text-lg font-bold flex justify-center items-center h-12 w-12 rounded-full border border-gray-200">
									{user.firstname.charAt(0).toUpperCase()}
								</div>
							) : (
								<Link
									title="Voir profil"
									to="/"
									className="hover:scale-105 transition-all"
								>
									<img
										src={user.profile.avatar}
										className="h-12 w-12 rounded-full border border-gray-200"
										alt="Avatar visitor"
									/>
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
