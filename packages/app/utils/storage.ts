"use strict";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { persistStore } from "redux-persist";
import { store } from "app/store/store";

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
	if (Platform.OS === "web") return atomWithLocalStorage(key, content);
	else return atomWithAsyncStorage(key, content);
}

export function resetPersistedStorages() {
	if (Platform.OS === "web") localStorage.clear();
	else AsyncStorage.clear();

	persistStore(store).purge();
}

export function logoutAndResetPersist() {
	resetPersistedStorages();
	store.dispatch({ type: "USER_LOGOUT" });
}

export function resetReduxPersist_reload() {
	persistStore(store).purge();
	if (Platform.OS === "web") location.reload();
}

// persistStore(store).purge();
