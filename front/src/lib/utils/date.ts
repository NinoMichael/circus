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
