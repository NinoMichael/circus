export interface ProtectedProps {
	roles?: string[];
	children: React.ReactNode;
}

export interface MapCoords {
	longitude: number;
	latitude: number;
}

export interface StationCoords {
	departure: MapCoords;
	arrival: MapCoords;
}

export interface ToggleSwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	description: string;
}
