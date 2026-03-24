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
