import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "app/hooks/useWarmUpBrowser";
import { Th } from "app/theme/components";
import { Toast } from "app/components/Toast";
import { useRouter } from "solito/router";
import { loadingAtom } from "app/store/slices/compoState";
import { useAtom } from "jotai";

WebBrowser.maybeCompleteAuthSession();

export const SignIn = () => {
	const [, setIsLoading] = useAtom(loadingAtom);
	// Warm up the android browser to improve UX
	// https://docs.expo.dev/guides/authentication/#improving-user-experience
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
	const router = useRouter();

	const onPress = async () => {
		try {
			setIsLoading(true);
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();
			setIsLoading(false);
			console.log(createdSessionId, setActive);
			if (createdSessionId && setActive) {
				setActive({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			setIsLoading(false);
			console.error("OAuth error", err);
			Toast.error("Auth Error: Some error occured. Please try again.");
		}
		router.replace({ pathname: "/" });
	};

	return (
		<Th.ButtonPrimary onPress={onPress}>Sign in with Google</Th.ButtonPrimary>
	);
};
