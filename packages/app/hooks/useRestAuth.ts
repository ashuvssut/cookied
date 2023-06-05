import { useAtom } from "jotai";
import {
	createAccount,
	getUserDetails,
	loginWithEmail,
	logout,
} from "../apis/appwriteAuthApi";
import { loadingAtom } from "../components/LoadingModal";
import { useEffect } from "react";
import {
	cookieAtom,
	cookieStore,
	sessionAtom,
	userAtom,
} from "app/store/slices/auth";

export function useRestAuth() {
	const [_l, setIsLoading] = useAtom(loadingAtom);
	const [user, setUser] = useAtom(userAtom);
	const [_s, setSession] = useAtom(sessionAtom);
	const [cookie, setCookie] = useAtom(cookieAtom);

	useEffect(() => void cookieStore.set(cookieAtom, cookie || ""), [cookie]);

	async function signIn(email: string, password: string) {
		setIsLoading(true);
		try {
			const { sessionData, cookie } = await loginWithEmail(email, password);
			const user = await getUserDetails();
			setUser(user);
			setSession(sessionData);
			setCookie(cookie);
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			console.error("Login Error:", e);
		}
	}
	async function register(name: string, email: string, password: string) {
		setIsLoading(true);
		try {
			const user = await createAccount(email, password, name);
			const { sessionData, cookie } = await loginWithEmail(email, password);
			setUser(user);
			setSession(sessionData);
			setCookie(cookie);
			setIsLoading(false);
			return user;
		} catch (e: any) {
			setIsLoading(false);
			console.error("Register Error", JSON.stringify(e));
			throw new Error(e);
		}
	}

	async function signOut() {
		if (!cookie) return;
		setIsLoading(true);
		try {
			await logout("current");
			setUser(null);
			setSession(null);
			setCookie("");
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			throw new Error(e);
		}
	}

	return { user, register, signIn, signOut };
}
