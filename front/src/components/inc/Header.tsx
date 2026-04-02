import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Logo from "./Logo";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationIcon from "@mui/icons-material/Notifications";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const [logoutDialog, setLogoutDialog] = useState(false);
	const { user, logout } = useAuth();

	const handleLogin = () => {
		navigate("/login");
	};

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await logout();
		navigate("/");
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
								<img
									src={user.profile.avatar}
									className="cursor-pointer -12 w-12 rounded-full border border-gray-200 hover:scale-105 transition-all"
									alt="Avatar visitor"
									onClick={(e) => handleMenuClick(e)}
								/>
							)}
						</div>
					)}
				</div>

				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					className="p-3!"
				>
					<Link to="/profile">
						<MenuItem className="cursor-pointer text-sm hover:text-primary">
							<PersonIcon className="size-4 mr-2" />
							<span>Profil</span>
						</MenuItem>
					</Link>
					<Link to="/history">
						<MenuItem className="cursor-pointer text-sm hover:text-primary">
							<HistoryIcon className="size-4 mr-2" />
							<span>Historique</span>
						</MenuItem>
					</Link>
					<MenuItem
						className="cursor-pointer text-sm hover:text-primary"
						onClick={() => setLogoutDialog(true)}
					>
						<LogoutIcon className="size-4 mr-2" />
						<span>Déconnexion</span>
					</MenuItem>
				</Menu>

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
		</header>
	);
};

export default Header;
