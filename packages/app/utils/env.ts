import { isWeb } from "app/utils/constants";
import Constants from "expo-constants";

export const CLERK_PUBLISHABLE_KEY = isWeb
	? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
	: Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY)
	throw Error("CLERK_PUBLISHABLE_KEY isn't set in env.js/.env.local");

export const CONVEX_URL = isWeb
	? process.env.NEXT_PUBLIC_CONVEX_URL
	: Constants.expoConfig?.extra?.CONVEX_URL;
if (!CONVEX_URL) throw Error("CONVEX_URL isn't set in env.js/.env.local");
