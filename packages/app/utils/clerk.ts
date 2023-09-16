import * as SecureStore from "expo-secure-store";
import { Toast } from "app/components/Toast";

export { useAuth, SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-expo";
export { SignIn } from "app/components/SignIn.native";

export const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			Toast.error(err.message || err.toString());
			return;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			Toast.error(err.message || err.toString());
			return;
		}
	},
};
