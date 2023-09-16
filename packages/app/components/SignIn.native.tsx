import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "app/hooks/useWarmUpBrowser";
import { Th } from "app/theme/components";

WebBrowser.maybeCompleteAuthSession();

export const SignIn = () => {
	// Warm up the android browser to improve UX
	// https://docs.expo.dev/guides/authentication/#improving-user-experience
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const onPress = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();

			if (createdSessionId && setActive) {
				setActive({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, []);

	return (
		<Th.ButtonPrimary onPress={onPress}>Sign in with Google</Th.ButtonPrimary>
	);
};
