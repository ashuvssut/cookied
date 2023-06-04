import { Provider } from "react-redux";
import { FCC } from "app/types/IReact";
import { PersistGate } from "redux-persist/integration/react";
import LoadingModal from "app/components/LoadingModal";
import { persistor, store } from "app/store/store";

export const ReduxProvider: FCC = ({ children }) => {
	return (
		<Provider store={store}>
			{/* @ts-ignore */}
			<PersistGate loading={<LoadingModal />} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};
