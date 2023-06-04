import { Models } from "appwrite";
import { atom, createStore } from "jotai";
import { atomWithPlatformStorage } from "../../utils/storage";

export const sessionAtom = //
	atomWithPlatformStorage<Models.Session | null>("session", null);

export const userAtom =
	atomWithPlatformStorage<Models.User<Models.Preferences> | null>("user", null);
export const isVerifiedAtom = //
	atom(get => get(userAtom)?.emailVerification || false); // read-only
export const isAuthAtom = atom(get => !!get(sessionAtom)?.$id);

export const cookieAtom = atomWithPlatformStorage("cookie", "");
export const cookieStore = createStore();
