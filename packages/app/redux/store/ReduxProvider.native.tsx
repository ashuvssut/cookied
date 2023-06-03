// TODO :-Persist Gate
import React from "react";
import { Provider } from "react-redux";

import  nativeStore  from "./store.native";

function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={nativeStore().store}>
			<>{children}</>
		</Provider>
	);
}

export default ReduxProvider;
