import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { FCC } from "../types/IReact";
import { useAuth } from "../hooks/useAuth";
import { TText } from "../theme";

// This hook will protect the route access based on user authentication.
function useProtectedRoute() {
	const segments = useSegments();
	const router = useRouter();
	const { isAuthenticated, isVerified } = useAuth();

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";
		if (!isAuthenticated && !inAuthGroup) {
			// If the user is not signed in and the initial segment is not anything in the auth group
			// Redirect to the app/login.
			router.replace("/login");
		} else if (!!isAuthenticated && !!inAuthGroup) {
			// Redirect away from the login page to app/index.
			//TODO : implement email verification later
			// if (isVerified) {
			// 	router.replace("/");
			// 	return
			// }
			// router.replace("/verify");
			router.replace("(app)/");
		}
	}, [isAuthenticated, segments]);
}

export const ProtectedRoute: FCC = ({ children }) => {
	useProtectedRoute();

	return <>{children}</>;
};
