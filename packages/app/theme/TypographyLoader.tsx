import * as p from "@expo-google-fonts/poppins";
import { platformFontsMap } from "app/theme/typography";
import { FCC } from "app/types/IReact";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();
const TypographyLoader: FCC = ({ children }) => {
	const [fontsLoaded] = useFonts(expoFontMap);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) await SplashScreen.hideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	return <View onLayout={onLayoutRootView}>{children}</View>;
};

// load font for native
export const expoFontMap = Object.entries(platformFontsMap).reduce(
	(acc, [key, fontName]) => ({
		...acc,
		[key]: p[fontName as keyof typeof p],
	}),
	{},
);

export default TypographyLoader;
