export const getImageUrl = (path?: string) => {
	if (!path) return;

	return path.startsWith("http")
		? path
		: `${import.meta.env.VITE_API_URL}storage/${path}`;
};
