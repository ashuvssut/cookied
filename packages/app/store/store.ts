import { configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { rootReducer } from "app/store/slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
	// stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		const middleware = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});
		if (__DEV__) {
			const createDebugger = require("redux-flipper").default;

			return middleware.concat(createDebugger());
		}
		return middleware;
	},
});

export const persistor = persistStore(store);
