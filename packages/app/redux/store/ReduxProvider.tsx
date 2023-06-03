// TODO :-Persist Gate
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import storeProvider from "./index";
import { Platform } from "react-native";

const isServer = () => typeof window === `undefined`;

function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={storeProvider().store}>
			<>{children}</>
		</Provider>
	);
}

export default ReduxProvider;
