import { useRestAuth } from "app/hooks/useRestAuth";
import { useSdkAuth } from "app/hooks/useSdkAuth";
import { Platform } from "react-native";

export const usePlatformAuth = () => {
	if (Platform.OS === "web") return useSdkAuth();
	else return useRestAuth();
};
