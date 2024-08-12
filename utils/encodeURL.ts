export const encodeURL = (url: string) =>
	encodeURIComponent(url).replace(/'/g, "%27").replace(/"/g, "%22");
