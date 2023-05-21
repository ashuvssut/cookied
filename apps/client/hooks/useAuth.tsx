import { Account, Models } from "appwrite";
import { atom, useAtom } from "jotai";
import { client } from "../utils/appwrite";

export const userAtom = atom<Models.User<Models.Preferences> | null>(null);

export function useAuth() {
	const [user, setUser] = useAtom(userAtom);

	async function signIn() {
		const account = new Account(client);

		try {
			// Go to OAuth provider login page - https://appwrite.io/docs/client/account?sdk=web-default#accountCreateOAuth2Session
			account.createOAuth2Session(
				"google" /** TODO: add success and failure deeplinks */,
			);
			// find a way to await for completion of the createOAuth2Session step
			// await??

			// updateUser after login attempt
			// https://appwrite.io/docs/client/account?sdk=web-default#accountGet
			const user = await account.get();
			setUser(user);
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
			// https://appwrite.io/docs/client/account?sdk=web-default#accountGetSession
			const session = await account.getSession("current");

			// https://appwrite.io/docs/client/account?sdk=web-default#accountDeleteSession
			const response = await account.deleteSession(session.$id);
			console.log("Session deleted", response);

			setUser(null);
		} catch (e) {
			console.error(e);
		}
	}

	return { user, signIn, signOut };
}
