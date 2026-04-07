import type { Variants } from "framer-motion";

// Page transition for every page with framer-motion
export const pageTransition = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

export const statusColors: Record<string, string> = {
	scheduled: "bg-[#f59e0b] text-white",
	active: "bg-green-600/70 text-white",
	completed: "bg-gray-400 text-white",
	cancelled: "bg-red-600/70 text-white",
};

export const card: Variants = {
	hidden: { opacity: 0, y: 40, scale: 0.96 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export const containerForm: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

export const itemButton: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};
