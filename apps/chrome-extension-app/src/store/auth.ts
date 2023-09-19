import { Models } from "appwrite";
import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const sessionAtom = //
	atomWithStorage<Models.Session | null>("session", null);

export const userAtom = //
	atomWithStorage<Models.User<Models.Preferences> | null>("user", null);
export const isVerifiedAtom = //
	atom(get => get(userAtom)?.emailVerification || false); // read-only
export const isAuthAtom = atom(get => !!get(sessionAtom)?.$id);

// export const cookieAtom = atomWithStorage("cookie", "");
// export const cookieStore = createStore();
