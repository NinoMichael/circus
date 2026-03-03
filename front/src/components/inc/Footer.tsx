import { Link } from "react-router-dom";

import Logo from "./Logo";
import Button from "@mui/material/Button";

import ShareIcon from "@mui/icons-material/Share";
import MailIcon from "@mui/icons-material/Mail";

const Footer = () => {
	return (
		<footer className="text-sm flex justify-between bg-white/90 backdrop-blur-md border-t border-primary/20 px-4 md:px-8 lg:px-16 py-6">
			<div className="flex gap-2 items-center">
				<Logo className="text-base sm:text-lg" />
				<span>@2026</span>
			</div>

			<nav className="hidden md:flex items-center gap-4 lg:gap-12">
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

			<div className="flex gap-4 items-center">
				<Button className="bg-accent hover:bg-primary" title="Partager">
					<ShareIcon className="opacity-80! text-lg!" />
				</Button>
				<Button className="bg-accent hover:bg-primary" title="Newsletter">
					<MailIcon className="opacity-80! text-lg!" />
				</Button>
			</div>
		</footer>
	);
};

export default Footer;
