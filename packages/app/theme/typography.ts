import { Platform } from "react-native";

const fontName = "Poppins";

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
	// i500: "Poppins_500Medium_Italic",
	r600: "Poppins_600SemiBold",
	// i600: "Poppins_600SemiBold_Italic",
	// r700: "Poppins_700Bold",
	// i700: "Poppins_700Bold_Italic",
	// r800: "Poppins_800ExtraBold",
	// i800: "Poppins_800ExtraBold_Italic",
	// r900: "Poppins_900Black",
	// i900: "Poppins_900Black_Italic",
};

// convert fontMap to platform font map to create font config for dripsy
const platformFont = (font: string) =>
	Platform.select({
		web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`,
		default: font,
	});

const platformFontsMap = Object.entries(fontsMap).reduce(
	(acc, [key, fontName]) => ({
		...acc,
		[key]: platformFont(fontName),
	}),
	{} as Record<string, string>,
);

export const customFontConfig = {
	customFonts: { [fontName]: platformFontsMap },
	fonts: { root: fontName },
};
