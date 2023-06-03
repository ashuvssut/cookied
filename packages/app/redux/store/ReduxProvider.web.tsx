// TODO :-Persist Gate
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { webStore } from "./index";
import { Platform } from "react-native";

function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<></>
		// <Provider store={webStore().store}>
		// 	<>{children}</>
		// </Provider>
	);
}

export default ReduxProvider;
