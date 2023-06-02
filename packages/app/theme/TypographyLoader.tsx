import { expoFontMap } from "app/theme/fonts";
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
	return (
		<View onLayout={onLayoutRootView}>
			<Text style={{ fontFamily: "Poppins", fontSize: 30 }}>Inter Black</Text>
			<Text style={{ fontSize: 30 }}>Platform Default</Text>
			{children}
		</View>
	);
};

export default TypographyLoader;
