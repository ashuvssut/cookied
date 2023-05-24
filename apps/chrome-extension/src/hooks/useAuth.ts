import { Account, Models, ID } from "appwrite";
import { useAtom } from "jotai";
import { client } from "../utils/appwrite";
import { atomWithStorage } from "jotai/utils";

type TUser = Models.User<Models.Preferences>;
export const currentUser = atomWithStorage<TUser | null>("currentUser", null);

export function useAuth() {
	const [user, setUser] = useAtom(currentUser);
	const account = new Account(client);

	async function registerUser({ email, password, name }: TRegisterUser) {
		try {
			// https://appwrite.io/docs/client/account?sdk=web-default#accountCreate
			const user = await account.create(ID.unique(), email, password, name);
			return user;
		} catch (e) {
			console.error(e);
			throw new Error(String(e));
		}
	}

	async function signIn() {
		try {
			// Go to OAuth provider login page - https://appwrite.io/docs/client/account?sdk=web-default#accountCreateOAuth2Session
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
		try {
			// https://appwrite.io/docs/client/account?sdk=web-default#accountDeleteSession
			const response = await account.deleteSession("current");
			console.log("Session deleted", response);

			setUser(null);
		} catch (e) {
			console.error(e);
		}
	}

	return { user, registerUser, signIn, signOut };
}

export type LoginUser = { email: string; password: string };
export type TRegisterUser = LoginUser & { name: string };
