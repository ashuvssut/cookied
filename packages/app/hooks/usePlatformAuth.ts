import { useRestAuth } from "app/hooks/useRestAuth";
import { useSdkAuth } from "app/hooks/useSdkAuth";
import { Platform } from "react-native";

export const usePlatformAuth = () => {
	const sdkAuth = useSdkAuth();
	const restAuth = useRestAuth();

	if (Platform.OS === "web") return sdkAuth;
	return restAuth;
};
