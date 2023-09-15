import { FCC } from "app/types/IReact";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
export const ClerkProtectedRoute: FCC = ({ children }) => {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</>
	);
};
