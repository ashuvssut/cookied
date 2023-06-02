import * as p from "@expo-google-fonts/poppins";
import { fontsMap } from "app/theme/typography";

// load font for native
export const expoFontMap = Object.entries(fontsMap).reduce(
	(acc, [key, fontName]) => ({
		...acc,
		[key]: p[fontName],
	}),
	{} as Record<string, string>,
);

