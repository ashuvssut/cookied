"use client";
import { Platform } from "react-native";
import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import AsyncStorage, {
	AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, Persistor } from "redux-persist";

import { rootReducer } from "../slices";
import {} from "react-native";

const middlewares: any[] = [
	/* other middlewares */
];

if (__DEV__ && Platform.OS !== "web") {
	const createDebugger = require("redux-flipper").default;
	middlewares.push(createDebugger());
}

const persistConfig = {
	key: "root",
	storage: Platform.OS==="web"?localStorage:AsyncStorage,
};

const persistedReducer = 
	persistReducer(persistConfig, rootReducer);

const configuredStore = () => {
	let store= configureStore({
		reducer: persistedReducer,
		middleware: middlewares,
	});
	let persistor: Persistor = persistStore(store);
	return { store, persistor };
};

export default configuredStore;
