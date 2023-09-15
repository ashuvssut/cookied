import SignInWithOAuth from "./NativeSignInWithOAuth";
import { FCC } from "app/types/IReact";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export const ClerkProtectedRoute: FCC = ({ children }) => {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<SignInWithOAuth />
			</SignedOut>
		</>
	);
};
