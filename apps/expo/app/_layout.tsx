import React, { useEffect } from "react";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { ClerkProtectedRoute } from "app/components/ClerkProtectedRoute";
import { ClerkAuth } from "app/components/ClerkAuth";
import { DripsyTheme } from "app/theme";
import { ReduxProvider } from "app/store/ReduxProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppState } from "react-native";
import type { AppStateStatus } from "react-native";
import { focusManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { ModalController } from "app/components/Modal";
import NetworkStatus from "app/components/NetworkStatus";
import { isWeb } from "app/utils/constants";

const queryClient = new QueryClient();

onlineManager.setEventListener(setOnline => {
	return NetInfo.addEventListener(state => {
		setOnline(!!state.isConnected);
	});
});

function onAppStateChange(status: AppStateStatus) {
	if (!isWeb) focusManager.setFocused(status === "active");
}

export default function Root() {
	useEffect(() => {
		const subscription = AppState.addEventListener("change", onAppStateChange);

		return () => subscription.remove();
	}, []);

	return (
		<ClerkAuth>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DripsyTheme>
					<ReduxProvider>
						<QueryClientProvider client={queryClient}>
							<NetworkStatus />
							<ClerkProtectedRoute>
								<Slot />
							</ClerkProtectedRoute>
							<LoadingModal />
							<ModalController />
						</QueryClientProvider>
					</ReduxProvider>
				</DripsyTheme>
			</GestureHandlerRootView>
		</ClerkAuth>
	);
}
