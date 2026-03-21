import NoTransferIcon from "@mui/icons-material/NoTransfer";

const NoTrip = () => {
	return (
		<div className="flex flex-col justify-center text-gray-400 items-center mx-auto space-y-6">
			<NoTransferIcon className="size-24" />

			<p className="w-64 xs:w-96 text-center">
				Aucun planning de voyage imminent assigné pour le moment
			</p>
		</div>
	);
};

export default NoTrip;
