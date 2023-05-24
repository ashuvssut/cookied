import { Account, ID, Models } from "appwrite";
import { atom, useAtom } from "jotai";
import { client } from "../utils/appwrite";

export const userAtom = atom<Models.User<Models.Preferences> | null>(null);
export const sessionAtom = atom<Models.Session | null>(null);

export function useAuth() {
	const [user, setUser] = useAtom(userAtom);
	const [session, setSession] = useAtom(sessionAtom);

	async function signIn(email: string, password: string) {
		const account = new Account(client);

		try {
			const sessionRes = await account.createEmailSession(email, password);
			const user = await account.get();
			console.log("User", user);
			console.log("User Session", sessionRes);
			setUser(user);
			setSession(sessionRes);
			return user;
		} catch (e) {
			console.error(e);
			setUser(null);
			return null;
		}
	}

	async function register(name: string, email: string, password: string) {
		const account = new Account(client);

		try {
			const userRes = await account.create(ID.unique(), email, password, name);
			console.log("User", userRes);
			setUser(userRes);
			return user;
		} catch (e) {
			console.error(e);
			setUser(null);
			return null;
		}
	}

	async function signOut() {
		const account = new Account(client);
		try {
			if (session) {
				const response = await account.deleteSession(session.$id);
				console.log("Session deleted", response);

				setUser(null);
				setSession(null);
			}
		} catch (e) {
			console.error("Not able to logout",e);
		}
	}

	return { user, register, signIn, signOut };
}
