export const getImageUrl = (path?: string | null) => {
	if (!path) return undefined;

	return path.startsWith("http")
		? path
		: `${import.meta.env.VITE_API_URL}storage/${path}`;
};
