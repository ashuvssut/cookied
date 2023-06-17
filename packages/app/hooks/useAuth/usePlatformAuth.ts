import { authStore, cookieAtom, sessionAtom } from "app/store/slices/auth";
import { useRestAuth } from "./useRestAuth";
import { useSdkAuth } from "./useSdkAuth";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { isWeb } from "app/utils/constants";

export const usePlatformAuth = () => {
	const sdkAuth = useSdkAuth();
	const restAuth = useRestAuth();

	const [session] = useAtom(sessionAtom);
	const [cookie] = useAtom(cookieAtom);
	useEffect(() => {
		authStore.set(cookieAtom, cookie || "");
		authStore.set(sessionAtom, session);
	}, [cookie, session]);

	if (isWeb) return sdkAuth;
	return restAuth;
};
