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
import storage from "redux-persist/lib/storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	// stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});
	},
});

export const persistor = persistStore(store);
