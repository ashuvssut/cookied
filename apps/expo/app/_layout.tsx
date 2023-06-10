import React, { useEffect } from "react";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import { DripsyTheme } from "app/theme";
import { ReduxProvider } from "app/store/ReduxProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppState, Platform } from "react-native";
import type { AppStateStatus } from "react-native";
import { focusManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { Modal } from "app/components/Modal";
import NetworkStatus from "app/components/NetworkStatus";

const queryClient = new QueryClient();

onlineManager.setEventListener(setOnline => {
	return NetInfo.addEventListener(state => {
		setOnline(!!state.isConnected);
	});
});

function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== "web") {
		focusManager.setFocused(status === "active");
	}
}

export default function Root() {
	useEffect(() => {
		const subscription = AppState.addEventListener("change", onAppStateChange);

		return () => subscription.remove();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<DripsyTheme>
				<ReduxProvider>
					<QueryClientProvider client={queryClient}>
						<NetworkStatus />
						<ProtectedRoute>
							<Slot />
						</ProtectedRoute>
						<LoadingModal />
						<Modal />
					</QueryClientProvider>
				</ReduxProvider>
			</DripsyTheme>
		</GestureHandlerRootView>
	);
}
