import React from "react";
import { DripsyTheme } from "app/theme";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { ProtectedRoute } from "app/components/ProtectedRoute";

export default function Root() {
	return (
		<DripsyTheme>
			<ProtectedRoute>
				<Slot />
			</ProtectedRoute>
			<LoadingModal />
		</DripsyTheme>
	);
}
