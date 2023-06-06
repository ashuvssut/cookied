import { useAtom } from "jotai";
import { loadingAtom } from "../components/LoadingModal";
import { isAuthAtom, sessionAtom, userAtom } from "app/store/slices/auth";
import { Account, ID } from "appwrite";
import { client } from "app/utils/appwrite";
import logr from "app/utils/logger";

export function useSdkAuth() {
	const [_l, setIsLoading] = useAtom(loadingAtom);
	const [user, setUser] = useAtom(userAtom);
	const [_s, setSession] = useAtom(sessionAtom);
	const [isAuth] = useAtom(isAuthAtom);

	const account = new Account(client);

	async function signIn(email: string, password: string) {
		setIsLoading(true);
		try {
			const sessionData = await account.createEmailSession(email, password);
			const user = await account.get();
			setSession(sessionData);
			setUser(user);
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			logr.err("Login Error:", e);
		}
	}
	async function register(name: string, email: string, password: string) {
		setIsLoading(true);
		try {
			const user = await account.create(ID.unique(), email, password, name);
			const sessionData = await account.createEmailSession(email, password);
			setUser(user);
			setSession(sessionData);
			setIsLoading(false);
			return user;
		} catch (e: any) {
			setIsLoading(false);
			logr.err("Register Error", e);
			throw new Error(e);
		}
	}

	async function signOut() {
		console.log("Is Auth",isAuth)
		if (!isAuth) return;
		setIsLoading(true);
		try {
			await account.deleteSession("current");
			setUser(null);
			setSession(null);
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			throw new Error(e);
		}
	}

	return { user, register, signIn, signOut };
}
