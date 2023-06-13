import { authStore, cookieAtom, sessionAtom } from "app/store/slices/auth";
import { useRestAuth } from "./useRestAuth";
import { useSdkAuth } from "./useSdkAuth";
import { Platform } from "react-native";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const usePlatformAuth = () => {
	const sdkAuth = useSdkAuth();
	const restAuth = useRestAuth();

	const [session] = useAtom(sessionAtom);
	const [cookie] = useAtom(cookieAtom);
	useEffect(() => {
		authStore.set(cookieAtom, cookie || "");
		authStore.set(sessionAtom, session);
	}, [cookie, session]);

	if (Platform.OS === "web") return sdkAuth;
	return restAuth;
};
