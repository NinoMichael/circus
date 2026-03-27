// Format date to dd/mm/yyyy
export function formatSlashDate(dateString: string) {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

// Extract time from full date
export function formatTime(dateString: string) {
	const date = new Date(dateString);
	const hours = String(date.getUTCHours()).padStart(2, "0");
	const minutes = String(date.getUTCMinutes()).padStart(2, "0");
	return `${hours}:${minutes}`;
}

// Explicit long date
export function formatDateLong(dateString: string) {
	const date = new Date(dateString);

	return date.toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

// Extract specific part of date
export const extractDate = (isoDate: string) => {
	const date = new Date(isoDate);

	const day = String(date.getUTCDate()).padStart(2, "0");

	const month = date
		.toLocaleString("fr-FR", {
			month: "short",
			timeZone: "UTC",
		})
		.toUpperCase();

	const year = date.getUTCFullYear();

	return { day, monthYear: `${month} ${year}` };
};

// Extract date for input
export const formatDateForInput = (dateStr: string) => {
	if (!dateStr) return "";
	const date = new Date(dateStr);
	return date.toISOString().split("T")[0];
};

// Format date in past time ago
export const formatTimeAgo = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "À l'instant";
	if (diffInSeconds < 3600)
		return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
	if (diffInSeconds < 86400)
		return `Il y a ${Math.floor(diffInSeconds / 3600)} h`;
	if (diffInSeconds < 604800)
		return `Il y a ${Math.floor(diffInSeconds / 86400)} j`;
	return date.toLocaleDateString("fr-FR");
};
