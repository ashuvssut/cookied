import { fontsMap } from "app/theme/typography";

const fontLink = (fontName: string) => {
	const getWebFontName = (fontName: string) => {
		const [family, weight, style] = fontName.split("_");
		const styleStr = style || "";
		const wgtStr = weight?.replace(/\d+/g, "") || weight;
		return `${family}-${wgtStr}${styleStr}`;
	};
	fontName = getWebFontName(fontName);
	return `/assets/fonts/Poppins/${fontName}.ttf`;
};

// load font for web
export const loadWebFonts = () => {
	const promises = Object.entries(fontsMap).map(([key, fontName]) => {
		const font = new FontFace(fontName, `url(${fontLink(fontsMap[key])})`, {
			weight: key.match(/\d+/g)![0] as any,
			style: key.includes("i") ? "italic" : "normal",
		});
		return font.load();
	});
	return Promise.all(promises);
};
