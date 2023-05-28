import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { Slot } from "expo-router";

import { TText, darkTheme, lightTheme } from "../theme";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useSendIntent } from "../hooks/useSendIntent";
import { useAtom } from "jotai";
import AuthHeader from "../components/AuthHeader";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/LoadingModal";

export default function Root() {
	const { isLoading } = useAuth();
	const colorScheme = useColorScheme();
	const selectedTheme = colorScheme === "dark" ? darkTheme : lightTheme;
	// console.log("SharedData", sharedData);
	// if (isLoading === true) {
	// 	return <LoadingModal isLoading={isLoading} />;
	// }

	return (
		// Setup the auth context and render our layout inside of it.
		<ThemeProvider theme={selectedTheme}>
			<ProtectedRoute>
				<Slot />
			</ProtectedRoute>
		</ThemeProvider>
	);
}
