"use strict";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

const textAtom = atomWithStorage("text", "hello");
