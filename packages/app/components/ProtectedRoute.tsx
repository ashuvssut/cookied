import React, { useEffect } from "react";
import { FCC } from "../types/IReact";
import { isAuthAtom, isVerifiedAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";
import { useRouter as useSolitoRouter } from "solito/router";
import { useRouteSegments } from "app/hooks/useRouteSegments";

// This hook will protect the route access based on user authentication.
function useProtectedRoute() {
	const segments = useRouteSegments();
	const solitoRouter = useSolitoRouter();
	const [isAuthenticated] = useAtom(isAuthAtom);
	const [isVerified] = useAtom(isVerifiedAtom);
	useEffect(() => {
		const inAuthGroup = segments.some(sg => ["login", "register"].includes(sg));
		if (!isAuthenticated && !inAuthGroup) {
			// If the user is not signed in and the initial segment is not anything in the auth group
			// Redirect to the app/login.
			solitoRouter.replace({ pathname: "/login" });
		} else if (!!isAuthenticated && !!inAuthGroup) {
			// Redirect away from the login page to app/index.
			//TODO : implement email verification later
			// if (isVerified) {
			// 	router.replace("/");
			// 	return
			// }
			// router.replace("/verify");
			solitoRouter.replace({ pathname: "/" });
		}
	}, [isAuthenticated, segments]);
}

export const ProtectedRoute: FCC = ({ children }) => {
	useProtectedRoute();

	return <>{children}</>;
};
