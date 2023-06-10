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
			logr.err("Register Error", e);
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
