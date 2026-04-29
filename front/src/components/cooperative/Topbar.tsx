import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getImageUrl } from "../../lib/utils/media";
import { cooperativeMenuItems } from "../../lib/data";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import LogoutIcon from "@mui/icons-material/Logout";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationIcon from "@mui/icons-material/Notifications";

const TopbarCooperative = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const [open, setOpen] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleLogout = async () => {
        await logout();
        navigateTo("/");
    };

    const DrawerMenu = (
        <Box
            className="w-64! space-y-8! p-8! flex! flex-col! justify-between!"
            role="presentation"
        >
            <div className="flex gap-3 items-center">
                <div className="bg-primary p-1.5 rounded-lg">
                    <TravelExploreIcon className="font-bold" />
                </div>
                <div className="space-y-2">
                    <h3 className="font-extrabold tracking-tight">Circus</h3>
                    <span className="opacity-50 font-semibold tracking-widest uppercase text-xs">
                        {user?.cooperative?.name}
                    </span>
                </div>
            </div>

            <nav className="flex flex-col gap-6">
                {cooperativeMenuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`transition-colors flex gap-2 items-center px-4 py-2 rounded-lg ${
                                isActive(item.path)
                                    ? "bg-primary"
                                    : "hover:text-primary"
                            }`}
                        >
                            <Icon className="opacity-80!" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
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
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "80%",
                            maxHeight: "60%",
                        },
                    }}
                    maxWidth="xs"
                    open={logoutDialog}
                >
                    <DialogTitle className="text-xl! text-secondary! font-bold!">
                        Déconnexion
                    </DialogTitle>
                    <DialogContent>
                        <p className="my-4">
                            Etes-vous sur de vouloir vous déconnecter ?
                        </p>
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
        <>
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/20 bg-white/80 px-4 md:px-8 py-4">
                <div className="flex gap-4">
                    <Button
                        className="lg:hidden! p-0!"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </Button>

                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerMenu}
                    </Drawer>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                    <div className="flex gap-2">
                        <IconButton title="Notifications" className="relative!">
                            <Badge color="error" max={99} className="!z-10">
                                <NotificationIcon className="opacity-80! text-lg!" />
                            </Badge>
                        </IconButton>
                    </div>
                    <Link
                        to="/"
                        title="Voir profil"
                        className="flex gap-4 items-center hover:scale-105 transition-all"
                    >
                        <div className="space-y-1 text-end">
                            <p className="font-semibold text-sm">
                                {user?.fullname}
                            </p>
                            <p className="font-light text-xs">Gérant</p>
                        </div>
                        {!user?.profile.avatar ? (
                            <div className="bg-primary text-lg font-bold flex justify-center items-center h-12 w-12 rounded-full border border-gray-200">
                                {user?.firstname.charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <img
                                src={getImageUrl(user?.profile.avatar)}
                                className="h-12 w-12 rounded-full border border-gray-200"
                                alt="Avatar station manager"
                            />
                        )}
                    </Link>
                </div>
            </header>
        </>
    );
};

export default TopbarCooperative;
