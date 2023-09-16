import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { FCC } from "app/types/IReact";
import { CLERK_PUBLISHABLE_KEY, CONVEX_URL } from "app/utils/env";
import * as SecureStore from "expo-secure-store";
import { Toast } from "app/components/Toast";

const tokenCache = {
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

const convex = new ConvexReactClient(CONVEX_URL);
export const ClerkAuth: FCC = ({ children }) => {
	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
