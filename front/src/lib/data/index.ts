import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingIcon from "@mui/icons-material/Settings";
import DomainIcon from "@mui/icons-material/Domain";
import EventIcon from "@mui/icons-material/EventNote";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";
import GroupIcon from "@mui/icons-material/Groups2";
import WalletIcon from "@mui/icons-material/Wallet";
import LabelIcon from "@mui/icons-material/NewLabel";

export const cooperativeMenuItems = [
    {
        label: "Tableau de bord",
        path: "/cooperative/overview",
        icon: DashboardIcon,
    },
    {
        label: "Analytique",
        path: "/cooperative/analytics",
        icon: BarChartIcon,
    },
    {
        label: "Planning",
        path: "/cooperative/planning",
        icon: EventIcon,
    },
    {
        label: "Réservation",
        path: "/cooperative/bookings",
        icon: TicketIcon,
    },
    {
        label: "Chauffeurs",
        path: "/cooperative/drivers",
        icon: GroupIcon,
    },
    {
        label: "Finance",
        path: "/cooperative/finance",
        icon: WalletIcon,
    },
    {
        label: "Codes promo",
        path: "/cooperative/promo-codes",
        icon: LabelIcon,
    },
    {
        label: "Paramètres",
        path: "/cooperative/settings",
        icon: SettingIcon,
    },
];

export const stationMenuItems = [
    {
        label: "Tableau de bord",
        path: "/station/dashboard",
        icon: DashboardIcon,
    },
    {
        label: "Analytique",
        path: "/station/analytics",
        icon: BarChartIcon,
    },
    {
        label: "Coopérative",
        path: "/station/cooperative",
        icon: DomainIcon,
    },
    {
        label: "Paramètres",
        path: "/station/settings",
        icon: SettingIcon,
    },
];
