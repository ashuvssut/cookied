import { Provider } from "react-redux";
import { FCC } from "app/types/IReact";
import { PersistGate } from "redux-persist/integration/react";
import LoadingModal from "app/components/LoadingModal";
import { persistor, store } from "app/store/store";
import { resetPersistedStorages } from "app/utils/storage";

export const ReduxProvider: FCC = ({ children }) => {
	// resetPersistedStorages();
	return (
		<Provider store={store}>
			{/* @ts-ignore */}
			<PersistGate loading={<LoadingModal />} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};
