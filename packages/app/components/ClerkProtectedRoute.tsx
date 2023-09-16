import { FCC } from "app/types/IReact";
import { SignedIn, SignedOut, SignIn } from "app/utils/clerk";
import AuthScreen from "app/screens/AuthScreen";

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
