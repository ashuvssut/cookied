import { Models } from "appwrite";
import { atom, useAtom } from "jotai";
import { createAccount, loginWithEmail, logout } from "../apis/appwriteAuthApi";
import { atomWithPlatformStorage } from "../utils/storage";
import { loadingAtom } from "../components/LoadingModal";

export const sessionAtom = //
	atomWithPlatformStorage<Models.Session | null>("session", null);

export const userAtom =
	atomWithPlatformStorage<Models.User<Models.Preferences> | null>("user", null);
export const isVerifiedAtom = //
	atom(get => get(userAtom)?.emailVerification || false); // read-only

export const cookieAtom = //
	atomWithPlatformStorage<string | null>("cookie", null);
export const isAuthAtom = atom(get => !!get(cookieAtom)); // read-only

export function useAuth() {
	const [_l, setIsLoading] = useAtom(loadingAtom);
	const [user, setUser] = useAtom(userAtom);
	const [_s, setSession] = useAtom(sessionAtom);
	const [isAuthenticated, _a] = useAtom(isAuthAtom);
	const [cookie, setCookie] = useAtom(cookieAtom);
	console.log(cookie)
	async function signIn(email: string, password: string) {
		setIsLoading(true);
		try {
			const { sessionData, cookie } = await loginWithEmail(email, password);
			// const user = await getUserDetails();
		} catch (e: any) {}
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
			console.log("Register Error", e);
			throw new Error(e);
		}
	}

	async function signOut() {
		if (!cookie) return;
		setIsLoading(true);
		try {
			await logout(cookie, "current");
			setUser(null);
			setSession(null);
			setCookie(null);
			setIsLoading(false);
		} catch (e: any) {
			setIsLoading(false);
			throw new Error(e);
		}
	}

	return { user, register, signIn, signOut };
}
