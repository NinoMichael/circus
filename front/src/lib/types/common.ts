import type { Booking } from "./booking";

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

export interface SEOProps {
	title: string;
	description: string;
	keywords?: string;
	url?: string;
	type?: "website" | "article" | "product";
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
}

export interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export interface BookingCardProps {
	booking: Booking;
	onCancel: (bookingId: number) => void;
}
