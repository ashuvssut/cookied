import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

const atomWithLocalStorage = (key: string, initialValue) => {
	const getInitialValue = () => {
		const item = localStorage.getItem(key);
		if (item !== null) {
			return JSON.parse(item);
		}
		return initialValue;
	};
	const baseAtom = atom(getInitialValue());
	const derivedAtom = atom(
		get => get(baseAtom),
		(get, set, update) => {
			const nextValue =
				typeof update === "function" ? update(get(baseAtom)) : update;
			set(baseAtom, nextValue);
			localStorage.setItem(key, JSON.stringify(nextValue));
		},
	);
	return derivedAtom;
};

const atomWithAsyncStorage = (key: string, initialValue) => {
	const baseAtom = atom(initialValue);
	baseAtom.onMount = setValue => {
		(async () => {
			const item = await AsyncStorage.getItem(key);
			if (item) {
				setValue(JSON.parse(item));
			}
		})();
	};
	const derivedAtom = atom(
		get => get(baseAtom),
		(get, set, update) => {
			const nextValue =
				typeof update === "function" ? update(get(baseAtom)) : update;
			set(baseAtom, nextValue);
			AsyncStorage.setItem(key, JSON.stringify(nextValue));
		},
	);
	return derivedAtom;
};
