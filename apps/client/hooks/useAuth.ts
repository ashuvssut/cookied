import { Account, ID, Models } from "appwrite";
import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../utils/appwrite";
import { useCallback, useEffect } from "react";

export const userAtom = atom<Models.User<Models.Preferences> | null>(null);
export const sessionAtom = atom<Models.Session | null>(null);
export const loadingAtom = atom<boolean | null>(null);
export const isAuthAtom = atom<boolean | null>(null);

export function useAuth() {
	const [isLoading, setIsLoading] = useAtom(loadingAtom);
	const [user, setUser] = useAtom(userAtom);
	const [session, setSession] = useAtom(sessionAtom);
	const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthAtom);

	const loadUser = useCallback(async () => {
		try {
			console.log("I am loading User");
			setIsLoading(true);
			const userData = await AsyncStorage.getItem("User");
			const sessionData = await AsyncStorage.getItem("Session");
			console.log("User Data", userData, sessionData);
			if (userData || sessionData) {
				if (userData) {
					setUser(JSON.parse(userData));
				}
				if (sessionData) {
					setUser(JSON.parse(sessionData));
				}
				setIsAuthenticated(true);
				setIsLoading(false);
				return;
			}
			setIsAuthenticated(false);
			setIsLoading(false);
		} catch (e) {
			console.log("Error Loading Data", e);
			setIsAuthenticated(false);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		console.log("Is Authenticated", JSON.stringify(isAuthenticated));

		loadUser();
	}, []);

	async function signIn(email: string, password: string) {
		setIsLoading(true);
		console.log("Signing In 1", client);
		const account = new Account(client);
		console.log("Signing In 2",account);

		try {
			const sessionRes = await account.createEmailSession(email, password);
			console.log("Signing In 2");
			const user = await account.get();
			AsyncStorage.setItem("Session", JSON.stringify(sessionRes));
			AsyncStorage.setItem("User", JSON.stringify(user));
			console.log("User", user);
			console.log("User Session", sessionRes);
			setUser(user);
			setSession(sessionRes);
			setIsLoading(false);
			setIsAuthenticated(true);
			return user;
		} catch (e) {
			console.error("eRROR ", e);
			setUser(null);
			setIsLoading(false);
			return null;
		}
	}

	async function register(name: string, email: string, password: string) {
		setIsLoading(true);
		console.log("Account 1", client);

		const account = new Account(client);
		console.log("Account 2", account);
		try {
			const userRes = await account.create(ID.unique(), email, password, name);
			const sessionRes = await account.createEmailSession(email, password);
			console.log("User", userRes);
			AsyncStorage.setItem("User", JSON.stringify(userRes));
			AsyncStorage.setItem("Session", JSON.stringify(sessionRes));
			setUser(userRes);
			setSession(sessionRes);
			setIsLoading(false);
			setIsAuthenticated(true);
			return userRes;
		} catch (e) {
			console.error(e);
			setUser(null);
			setIsLoading(false);
			setIsAuthenticated(false);
			return null;
		}
	}

	async function signOut() {
		setIsLoading(true);
		const account = new Account(client);

		try {
			if (session || user) {
				console.log("Session deleted");
				if (session) {
					const response = await account.deleteSession(session.$id);
					console.log("Session deleted", response);
					AsyncStorage.removeItem("Session");
				}
				if (user) {
					AsyncStorage.removeItem("User");
					console.log("User deleted");
				}
				setUser(null);
				setSession(null);
				setIsLoading(false);
				setIsAuthenticated(false);
			}
		} catch (e) {
			console.error("Not able to logout");
			console.error("Not able to logout", JSON.stringify(e));
			setIsLoading(false);
			setIsAuthenticated(true);
		}
	}

	return { user, register, signIn, signOut, isLoading, isAuthenticated };
}
