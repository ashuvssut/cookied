import React from "react";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import { DripsyTheme } from "app/theme";
import { ReduxProvider } from "app/store/ReduxProvider";

export default function Root() {
	return (
		<DripsyTheme>
			<ReduxProvider>
				<ProtectedRoute>
					<Slot />
				</ProtectedRoute>
				<LoadingModal />
			</ReduxProvider>
		</DripsyTheme>
	);
}
