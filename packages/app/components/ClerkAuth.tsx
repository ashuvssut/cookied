import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { FCC } from "app/types/IReact";
import { CLERK_PUBLISHABLE_KEY, CONVEX_URL } from "app/utils/env";
import { tokenCache, ClerkProvider, useAuth } from "app/utils/clerk";

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
