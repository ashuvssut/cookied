import React from "react";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import { DripsyTheme } from "app/theme";
import { ReduxProvider } from "app/store/ReduxProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<DripsyTheme>
				<ReduxProvider>
					<ProtectedRoute>
						<Slot />
					</ProtectedRoute>
					<LoadingModal />
				</ReduxProvider>
			</DripsyTheme>
		</GestureHandlerRootView>
	);
}
