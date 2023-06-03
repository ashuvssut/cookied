// TODO :-Persist Gate
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { nativeStore } from "./index";
import { Platform } from "react-native";

function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={nativeStore().store}>
			<>{children}</>
		</Provider>
	);
}

export default ReduxProvider;
