import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const Logo = ({ className = "text-lg sm:text-xl" }) => {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<div className="bg-primary p-1.5 rounded-lg">
				<TravelExploreIcon className="font-bold" />
			</div>
			<h1 className="font-extrabold tracking-tight">Circus</h1>
		</div>
	);
};

export default Logo;
