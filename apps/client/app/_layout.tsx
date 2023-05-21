import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { Slot } from "expo-router";

import { Provider } from "../contexts/authContext";
import { darkTheme, lightTheme } from "../theme";

export default function Root() {
	const colorScheme = useColorScheme();
	const selectedTheme = colorScheme === "dark" ? darkTheme : lightTheme;
	return (
		// Setup the auth context and render our layout inside of it.
		<ThemeProvider theme={selectedTheme}>
			<Provider>
				<Slot />
			</Provider>
		</ThemeProvider>
	);
}
