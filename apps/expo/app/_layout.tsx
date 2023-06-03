import React from "react";
import { Slot } from "expo-router";
import LoadingModal from "app/components/LoadingModal";
import { PersistGate } from "redux-persist/integration/react";

import ReduxProvider from "app/redux/store/ReduxProvider";
import { ProtectedRoute } from "app/components/ProtectedRoute";
import { DripsyTheme } from "app/theme";
import storeProvider from "app/redux/store";

export default function Root() {
	return (
		<DripsyTheme>
			<ReduxProvider>
				<PersistGate
					loading={null}
					persistor={storeProvider().persistor}
				>
					<ProtectedRoute>
						<Slot />
					</ProtectedRoute>
					<LoadingModal />
				</PersistGate>
			</ReduxProvider>
		</DripsyTheme>
	);
}
