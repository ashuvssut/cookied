import React from "react";
import { Text, Box } from "../theme";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { Slot } from "expo-router";

import { darkTheme, lightTheme } from "../theme";
import { ProtectedRoute } from "../components/ProtectedRoute";

type Props = {
	url?: string;
};

export default function Root(props: Props) {
	const colorScheme = useColorScheme();
	const selectedTheme = colorScheme === "dark" ? darkTheme : lightTheme;
	return (
		// Setup the auth context and render our layout inside of it.
		<ThemeProvider theme={selectedTheme}>
			<ProtectedRoute>
				<Slot />
				<Box backgroundColor={"primary"}>
					<Text color={"text"}>{props.url}</Text>
				</Box>
			</ProtectedRoute>
		</ThemeProvider>
	);
}
