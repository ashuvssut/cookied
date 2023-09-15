import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { FCC } from "app/types/IReact";
import { CLERK_PUBLISHABLE_KEY, CONVEX_URL } from "app/utils/env";

const convex = new ConvexReactClient(CONVEX_URL);
export const ClerkAuth: FCC = ({ children }) => {
	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
