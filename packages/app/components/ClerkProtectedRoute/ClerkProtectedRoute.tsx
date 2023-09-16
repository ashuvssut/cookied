import { FCC } from "app/types/IReact";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import AuthScreen from "app/screens/AuthScreen";
import SignIn from "app/components/ClerkProtectedRoute/SignIn.native";

export const ClerkProtectedRoute: FCC = ({ children }) => {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<AuthScreen ClerkInitiator={<SignIn />} />
			</SignedOut>
		</>
	);
};
