import { useAtom } from "jotai";
import { isAuthAtom, sessionAtom, userAtom } from "app/store/slices/auth";
import { Account, ID } from "appwrite";
import { client } from "app/utils/appwrite";
import logr from "app/utils/logr";
import { loadingAtom } from "app/components/LoadingModal";
import { logoutAndResetPersist } from "app/utils/storage";
import { Toast } from "app/components/Toast";

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
			Toast.error(e.message || "Error Logging In");
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
			Toast.error(e.message || "Error Signing Up");
			logr.err("Signup Error:", e);
		}
	}

	async function signOut() {
		console.log("Is Auth", isAuth);
		if (!isAuth) return;
		setIsLoading(true);
		try {
			await account.deleteSession("current");
			logoutAndResetPersist();
			setUser(null);
			setSession(null);
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			Toast.error(e.message || "Error Logging Out");
			logr.err("Logout Error:", e);
		}
	}

	return { user, register, signIn, signOut };
}
