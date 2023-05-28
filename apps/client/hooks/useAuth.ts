import { Account, ID, Models } from "appwrite";
import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../utils/appwrite";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import axios from "axios";
import {
	createAccount,
	getUserDetails,
	loginWithEmail,
	logout,
} from "../apis/appwriteAuthApi";

export const userAtom = atom<Models.User<Models.Preferences> | null>(null);
export const sessionAtom = atom<Models.Session | null>(null);
export const loadingAtom = atom<boolean | null>(null);
export const isAuthAtom = atom<boolean | null>(null);
export const isVerifiedAtom = atom<boolean | null>(null);

export function useAuth() {
	const [isLoading, setIsLoading] = useAtom(loadingAtom);
	const [user, setUser] = useAtom(userAtom);
	const [session, setSession] = useAtom(sessionAtom);
	const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthAtom);
	const [isVerified, setIsVerified] = useAtom(isVerifiedAtom);

	const loadUser = useCallback(async () => {
		try {
			console.log("I am loading User");
			setIsLoading(true);
			let userData: string | null = null;
			let sessionData: string | null = null;
			if (Platform.OS === "web") {
				userData = localStorage.getItem("User");
				sessionData = localStorage.getItem("Session");
				if (userData || sessionData) {
					if (userData) {
						const parsedUserData: Models.User<Models.Preferences> =
							JSON.parse(userData);
						setUser(JSON.parse(userData));
						parsedUserData.emailVerification
							? setIsVerified(true)
							: setIsVerified(false);
					}
					if (sessionData) {
						setSession(JSON.parse(sessionData));
					}
					setIsAuthenticated(true);
					setIsLoading(false);
					return;
				}
			} else {
				userData = await AsyncStorage.getItem("User");
				sessionData = await AsyncStorage.getItem("Session");
				if (userData || sessionData) {
					if (userData) {
						const parsedUserData: Models.User<Models.Preferences> =
							JSON.parse(userData);
						setUser(JSON.parse(userData));
						parsedUserData.emailVerification
							? setIsVerified(true)
							: setIsVerified(false);
					}
					if (sessionData) {
						setUser(JSON.parse(sessionData));
					}
					setIsAuthenticated(true);
					setIsLoading(false);
					return;
				}
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
			loadUser();
	}, []);

	async function signIn(email: string, password: string) {
		setIsLoading(true);
		console.log("Signing In 1", client);
		const account = new Account(client);
		console.log("Signing In 2", account);

		try {
			if (Platform.OS === "web") {
				const sessionRes = await loginWithEmail(email, password);
				const userRes = await getUserDetails();
				localStorage.setItem("Session", JSON.stringify(sessionRes));
				localStorage.setItem("User", JSON.stringify(userRes));
				setUser(userRes);
				setSession(sessionRes);
				setIsLoading(false);
				setIsAuthenticated(true);
				return userRes;
			}
			const sessionRes = await account.createEmailSession(email, password);
			console.log("Signing In 2");
			const userRes = await account.get();
			await AsyncStorage.setItem("Session", JSON.stringify(sessionRes));
			await AsyncStorage.setItem("User", JSON.stringify(userRes));
			console.log("User", userRes);
			console.log("User Session", sessionRes);
			setUser(userRes);
			setSession(sessionRes);
			setIsLoading(false);
			setIsAuthenticated(true);
			return userRes;
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

		try {
			if (Platform.OS === "web") {
				const userRes = await createAccount(email, password, name);
				const sessionRes = await loginWithEmail(email, password);
				localStorage.setItem("Session", JSON.stringify(sessionRes));
				localStorage.setItem("User", JSON.stringify(userRes));
				setUser(userRes);
				setSession(sessionRes);
				setIsLoading(false);
				setIsAuthenticated(true);
				return userRes;
			}
			const account = new Account(client);
			const userRes = await account.create(ID.unique(), email, password, name);
			const sessionRes = await account.createEmailSession(email, password);
			console.log("User", userRes);
			await AsyncStorage.setItem("User", JSON.stringify(userRes));
			await AsyncStorage.setItem("Session", JSON.stringify(sessionRes));
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
		console.log("Start Logging out Sesion");

		try {
			if (Platform.OS === "web") {
				let msg = "";
				console.log("Logging out Sesion", JSON.stringify(session));
				if (session || user) {
					if (session) {
						msg = await logout(session.$id);
						localStorage.removeItem("Session");
					} else if (user) {
						localStorage.removeItem("User");
					}
				}
				setUser(null);
				setSession(null);
				setIsLoading(false);
				setIsAuthenticated(null);
				return msg;
			}
			if (session || user) {
				console.log("Session deleted");
				if (session) {
					const response = await account.deleteSession(session.$id);
					console.log("Session deleted", JSON.stringify(response));
					await AsyncStorage.removeItem("Session");
				} else if (user) {
					await AsyncStorage.removeItem("User");
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

	return {
		user,
		register,
		signIn,
		signOut,
		isLoading,
		isAuthenticated,
		isVerified,
	};
}
