import { makeTheme } from "dripsy";
import { Platform } from "react-native";

export const fontsMap = {
	// r100: "Poppins_100Thin",
	// i100: "Poppins_100Thin_Italic",
	// r200: "Poppins_200ExtraLight",
	// i200: "Poppins_200ExtraLight_Italic",
	// r300: "Poppins_300Light",
	// i300: "Poppins_300Light_Italic",
	r400: "Poppins_400Regular",
	i400: "Poppins_400Regular_Italic",
	r500: "Poppins_500Medium",
	i500: "Poppins_500Medium_Italic",
	r600: "Poppins_600SemiBold",
	// i600: "Poppins_600SemiBold_Italic",
	// r700: "Poppins_700Bold",
	// i700: "Poppins_700Bold_Italic",
	// r800: "Poppins_800ExtraBold",
	// i800: "Poppins_800ExtraBold_Italic",
	// r900: "Poppins_900Black",
	// i900: "Poppins_900Black_Italic",
};
type TFontVariant = keyof typeof fontsMap;

// convert fontMap to platform font map to create font config for dripsy
const fontName = "Poppins";
const getFontFamStr = (font: TFontVariant) => {
	const fontFam =
		Platform.OS === "web"
			? `${fontName}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`
			: font;
	return fontFam;
};
let platformFontsMap = Object.entries(fontsMap).reduce(
	(acc, [key, fontName]) => ({
		...acc,
		[key]: getFontFamStr(fontName as TFontVariant),
	}),
	{} as Record<TFontVariant, string>,
);

export { platformFontsMap };

export const customFontConfig = makeTheme({
	customFonts: { [fontName]: platformFontsMap },
	fonts: { root: fontName },
	text: {
		body: {
			fontWeight: "400",
			fontFamily: getFontFamStr("r400"),
			color: "onPrimary",
		},
		h1: {
			fontSize: 24,
			fontWeight: "600",
			fontFamily: getFontFamStr("r600"),
			color: "onPrimary",
		},
		label: {
			fontSize: 16,
			fontWeight: "500",
			fontFamily: getFontFamStr("r500"),
			color: "onPrimary",
			py: 4,
		},
		link: {
			fontWeight: "500",
			fontFamily: getFontFamStr("r500"),
			color: "link",
			textDecorationLine: "underline",
		},
		regular: {
			fontWeight: "400",
			fontFamily: getFontFamStr("r400"),
		},
		regularItalic: {
			fontWeight: "400",
			fontStyle: "italic",
			fontFamily: getFontFamStr("i400"),
		},
		medium: {
			fontWeight: "500",
			fontFamily: getFontFamStr("r500"),
		},
		mediumItalic: {
			fontWeight: "500",
			fontStyle: "italic",
			fontFamily: getFontFamStr("i500"),
		},
		semibold: {
			fontWeight: "600",
			fontFamily: getFontFamStr("r600"),
		},
	},
});
