import React from "react";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { PersistGate } from "redux-persist/integration/react";

import { ProtectedRoute } from "app/components/ProtectedRoute";
import { DripsyTheme } from "app/theme";
import { nativeStore, NativeReduxProvider } from "app/redux/store";

export default function Root() {
	return (
		<DripsyTheme>
			<NativeReduxProvider>
				<PersistGate loading={null} persistor={nativeStore().persistor}>
					<ProtectedRoute>
						<Slot />
					</ProtectedRoute>
					<LoadingModal />
				</PersistGate>
			</NativeReduxProvider>
		</DripsyTheme>
	);
}
