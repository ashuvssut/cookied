import { useAtom } from "jotai";
import {
	createAccount,
	getUserDetails,
	loginWithEmail,
	logout,
} from "app/apis/appwriteAuthApi";
import { cookieAtom, sessionAtom, userAtom } from "app/store/slices/auth";
import logr from "app/utils/logr";
import { loadingAtom } from "app/components/LoadingModal";
import { logoutAndResetPersist } from "app/utils/storage";
import { Toast } from "app/components/Toast";

export function useRestAuth() {
	const [_l, setIsLoading] = useAtom(loadingAtom);
	const [user, setUser] = useAtom(userAtom);
	const [_s, setSession] = useAtom(sessionAtom);
	const [cookie, setCookie] = useAtom(cookieAtom);

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
			Toast.error(e.message || "Error Logging In");
			logr.err("Login Error:", e);
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
			Toast.error(e.message || "Error Signing Up");
			logr.err("Signup Error:", e);
		}
	}

	async function signOut() {
		// if (!cookie) return; // TODO : Not Persisting
		setIsLoading(true);
		try {
			await logout("current");
			logoutAndResetPersist();
			setUser(null);
			setSession(null);
			setCookie("");
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			Toast.error(e.message || "Error Logging Out");
			logr.err("Logout Error:", e);
		}
	}

	return { user, register, signIn, signOut };
}
