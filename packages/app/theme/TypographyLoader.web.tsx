import Head from "next/head";
import { FCC } from "app/types/IReact";
import { fontsMap } from "app/theme/typography";

const TypographyLoader: FCC = ({ children }) => {
	// loadWebFonts();
	const fontsLink = getFontsLink();

	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link href={fontsLink} rel="stylesheet" />
			</Head>
			{children}
		</>
	);
};

const getFontsLink = () => {
	const regularWts: string[] = [];
	Object.keys(fontsMap).forEach(key => {
		if (key.includes("r"))
			regularWts.push(key.match(/\d+/g) ? key.match(/\d+/g)![0] : "400");
	});

	const italicWts: string[] = [];
	Object.keys(fontsMap).forEach(key => {
		if (key.includes("i"))
			italicWts.push(key.match(/\d+/g) ? key.match(/\d+/g)![0] : "400");
	});

	const regularWghtStr = regularWts.map(wght => `0,${wght};`).join("");
	const italicWghtStr = italicWts.map(wght => `1,${wght};`).join("");
	const fontStr = `${regularWghtStr}${italicWghtStr}`.slice(0, -1);
	const fontsLink = `https://fonts.googleapis.com/css2?family=Poppins:ital,wght@${fontStr}&display=swap`;

	return fontsLink;
};
// const fontLink = (fontName: string) => {
// 	const getWebFontName = (fontName: string) => {
// 		const [family, weight, style] = fontName.split("_");
// 		const styleStr = style || "";
// 		const wgtStr = weight?.replace(/\d+/g, "") || weight;
// 		return `${family}-${wgtStr}${styleStr}`;
// 	};
// 	fontName = getWebFontName(fontName);
// 	return `/assets/fonts/Poppins/${fontName}.ttf`;
// };

// // load font for web
// export const loadWebFonts = () => {
// 	const promises = Object.entries(fontsMap).map(([key, fontName]) => {
// 		const font = new FontFace(fontName, `url(${fontLink(fontsMap[key])})`, {
// 			weight: key.match(/\d+/g)![0] as any,
// 			style: key.includes("i") ? "italic" : "normal",
// 		});
// 		return font.load();
// 	});
// 	return Promise.all(promises);
// };

export default TypographyLoader;
