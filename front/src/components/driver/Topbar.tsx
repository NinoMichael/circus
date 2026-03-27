import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { getImageUrl } from "../../lib/utils/media";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

import Logo from "../inc/Logo";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import NotificationIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticIcon from "@mui/icons-material/Analytics";
import DirectionBusIcon from "@mui/icons-material/DirectionsBus";
import SettingIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CircleIcon from "@mui/icons-material/Circle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { formatTimeAgo } from "../../lib/utils/date";

const TopbarDriver = () => {
	const navigateTo = useNavigate();
	const location = useLocation();
	const { user, logout } = useAuth();
	const {
		notifications,
		unreadCount,
		fetchNotifications,
		markAsRead,
		markAllAsRead,
		deleteNotification,
	} = useNotification();

	const [open, setOpen] = useState(false);
	const [logoutDialog, setLogoutDialog] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [notificationOpen, setNotificationOpen] = useState(false);

	useEffect(() => {
		fetchNotifications();
	}, [fetchNotifications]);

	const isActive = (path: string) => {
		if (path === "/driver/planning") {
			return (
				location.pathname === path ||
				location.pathname.startsWith("/driver/planning/")
			);
		}
		return location.pathname === path;
	};

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const handleLogout = async () => {
		await logout();
		navigateTo("/");
	};

	const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setNotificationOpen(true);
	};

	const handleNotificationClose = () => {
		setAnchorEl(null);
		setNotificationOpen(false);
	};

	const handleMarkAllAsRead = async () => {
		await markAllAsRead();
	};

	const handleDeleteNotification = async (
		notificationId: number,
		e: React.MouseEvent
	) => {
		e.stopPropagation();
		await deleteNotification(notificationId);
	};

	const DrawerMenu = (
		<Box
			className="w-64! space-y-8! p-8! flex! flex-col! justify-between!"
			role="presentation"
		>
			<Logo />

			<div className="mt-4 flex flex-col items-start text-left gap-1 mb-4">
				<p className="text-lg font-bold">Tantely Ny Aina</p>
				<p className="text-text/60 text-sm font-medium">Chauffeur • ID #89</p>
			</div>

			<nav className="flex flex-col gap-6">
				<Link
					className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
						isActive("/driver/overview") ? "bg-primary" : "hover:text-primary"
					}`}
					to="/driver/overview"
				>
					<DashboardIcon className="opacity-80!" />
					<span>Tableau de bord</span>
				</Link>
				<Link
					className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
						isActive("/driver/planning") ? "bg-primary" : "hover:text-primary"
					}`}
					to="/driver/planning"
				>
					<CalendarMonthIcon className="opacity-80!" />
					<span>Planning</span>
				</Link>
				<Link
					className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
						isActive("/driver/performance")
							? "bg-primary"
							: "hover:text-primary"
					}`}
					to="/driver/performance"
				>
					<AnalyticIcon className="opacity-80!" />
					<span>Performance</span>
				</Link>
				<Link
					className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
						isActive("/driver/bus") ? "bg-primary" : "hover:text-primary"
					}`}
					to="/driver/bus"
				>
					<DirectionBusIcon className="opacity-80!" />
					<span>Taxi-brousse</span>
				</Link>
				<Link
					className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
						isActive("/driver/settings") ? "bg-primary" : "hover:text-primary"
					}`}
					to="/driver/settings"
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
						<IconButton
							title="Notifications"
							onClick={handleNotificationClick}
							className="relative!"
						>
							<Badge
								badgeContent={unreadCount}
								color="error"
								max={99}
								className="!z-10"
							>
								<NotificationIcon className="opacity-80! text-lg!" />
							</Badge>
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={notificationOpen}
							onClose={handleNotificationClose}
							PaperProps={{
								className: "w-80 max-h-96 overflow-hidden flex flex-col",
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
								<Typography className="font-bold text-base!">
									Notifications
								</Typography>
								{unreadCount > 0 && (
									<Button
										size="small"
										startIcon={<DoneAllIcon />}
										onClick={handleMarkAllAsRead}
										className="text-xs!"
									>
										Tout marquer
									</Button>
								)}
							</div>

							<Box className="overflow-y-auto flex-1">
								{notifications.length === 0 ? (
									<Box className="p-6 text-center text-gray-500">
										<NotificationIcon className="text-4xl opacity-30 mb-2" />
										<Typography className="text-sm">
											Aucune notification
										</Typography>
									</Box>
								) : (
									notifications.slice(0, 5).map((notification) => (
										<MenuItem
											key={notification.id}
											onClick={() => {
												if (!notification.read_at) {
													markAsRead(notification.id);
												}
												handleNotificationClose();
											}}
											className={`flex items-start gap-3 py-3 px-4! ${
												!notification.read_at ? "bg-primary/5" : ""
											}`}
										>
											<ListItemIcon className="min-w-8 mt-0">
												{notification.read_at ? (
													<InfoIcon className="text-gray-400 text-lg!" />
												) : (
													<CircleIcon className="text-primary text-xs!" />
												)}
											</ListItemIcon>
											<Box className="flex-1 min-w-0">
												<Typography className="font-semibold text-sm! truncate">
													{notification.title}
												</Typography>
												<Typography className="text-xs text-gray-600 line-clamp-2">
													{notification.message}
												</Typography>
												<Typography className="text-xs text-gray-400 mt-1">
													{formatTimeAgo(notification.created_at)}
												</Typography>
											</Box>
											<IconButton
												size="small"
												onClick={(e) =>
													handleDeleteNotification(notification.id, e)
												}
												className="text-gray-400 hover:text-red-500!"
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</MenuItem>
									))
								)}
							</Box>

							{notifications.length > 0 && (
								<Box className="border-t border-gray-100 p-2">
									<Button
										fullWidth
										size="small"
										onClick={() => {
											navigateTo("/driver/notifications");
											handleNotificationClose();
										}}
										className="text-sm!"
									>
										Voir toutes les notifications
									</Button>
								</Box>
							)}
						</Menu>
					</div>
					{!user?.profile.avatar ? (
						<div className="bg-primary text-lg font-bold flex justify-center items-center h-12 w-12 rounded-full border border-gray-200">
							{user?.firstname.charAt(0).toUpperCase()}
						</div>
					) : (
						<Link
							title="Voir profil"
							to="/driver/profile"
							className="hover:scale-105 transition-all"
						>
							<img
								src={getImageUrl(user.profile.avatar)}
								className="h-12 w-12 rounded-full border border-gray-200"
								alt="Avatar visitor"
							/>
						</Link>
					)}
				</div>
			</header>
		</header>
	);
};

export default TopbarDriver;
