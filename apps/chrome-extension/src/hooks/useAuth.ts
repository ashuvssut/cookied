import { Account, Models, ID, Functions } from "appwrite";
import { useAtom } from "jotai";
import { client } from "../utils/appwrite";
import { atomWithStorage } from "jotai/utils";
import { VERCEL_DEV_URL, VERCEL_PROD_URL } from "@src/utils/constants";
import axios from "axios";

type TUser = Models.User<Models.Preferences>;
export const currentUser = atomWithStorage<TUser | null>("currentUser", null);

export function useAuth() {
	const [user, setUser] = useAtom(currentUser);
	const account = new Account(client);

	async function registerUser(userData: TRegisterUser) {
		try {
			const user = await axios.post(
				`${VERCEL_PROD_URL}/registerUser`,
				userData,
			);
			console.log("user from registerUser", user);
			return user;
		} catch (e) {
			console.error(e);
			throw new Error(String(e));
		}
	}

	async function signIn() {
		try {
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

// async function registerUser({ email, password, name }: RegisterUser) { // DIDN'T WORK
// 	try {
// 		const user = await account.create(ID.unique(), email, password, name);
// 		return user;
// 	} catch (e) {
// 		console.error(e);
// 		return null;
// 	}
// }
//
// async function registerUser(userData: TRegisterUser) { // DIDN'T WORK EITHER
// 	const functions = new Functions(client);
// 	try {
// 		const res = await functions.createExecution(
// 			REGISTER_USER_FX_ID,
// 			JSON.stringify(userData),
// 			true,
// 		);
// 		console.log("res", res);
// 		return res;
// 	} catch (e) {
// 		console.error(e);
// 		throw new Error(String(e));
// 	}
// }
