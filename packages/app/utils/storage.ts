"use strict";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore } from "redux-persist";
import { store } from "app/store/store";
import { isWeb } from "app/utils/constants";

// content: anything JSON serializable
export function atomWithAsyncStorage<T>(key: string, content: T) {
	const storage = createJSONStorage<T>(() => AsyncStorage);
	return atomWithStorage(key, content, storage);
}

export function atomWithLocalStorage<T>(key: string, content: T) {
	const storage = createJSONStorage<T>(() => localStorage);
	return atomWithStorage(key, content, storage);
}

export function atomWithPlatformStorage<T>(key: string, content: T) {
	if (isWeb) return atomWithLocalStorage(key, content);
	else return atomWithAsyncStorage(key, content);
}

export function resetPersistedStorages() {
	if (isWeb) localStorage.clear();
	else AsyncStorage.clear();

	persistStore(store).purge();
}

export function logoutAndResetPersist() {
	resetPersistedStorages();
	store.dispatch({ type: "USER_LOGOUT" });
}

export function resetReduxPersist_reload() {
	persistStore(store).purge();
	if (isWeb) location.reload();
}

// persistStore(store).purge();
