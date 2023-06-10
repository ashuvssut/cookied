import { useRestAuth } from "./useRestAuth";
import { useSdkAuth } from "./useSdkAuth";
import { Platform } from "react-native";

export const usePlatformAuth = () => {
	const sdkAuth = useSdkAuth();
	const restAuth = useRestAuth();

	if (Platform.OS === "web") return sdkAuth;
	return restAuth;
};
