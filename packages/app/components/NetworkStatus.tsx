import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { Text, View, useDripsyTheme } from "dripsy";
import { useSafeArea } from "app/components/SafeArea";

const NetworkStatus = () => {
	const netInfo = useNetInfo();

	if (netInfo.isConnected) {
		return null; // No need to show the message if there is an internet connection
	}
	const inset = useSafeArea();
	const error = useDripsyTheme().theme.colors.error;
	return (
		<View
			variant={"layout.absoluteFlex"}
			sx={{
				alignItems: "center",
				justifyContent: "flex-end",
				bg: error,
				opacity: 0.8,
				zIndex: 9999,
				height: inset.top + 15,
				flex: undefined,
			}}
		>
			<Text variant="semibold">No Internet Connection</Text>
		</View>
	);
};

export default NetworkStatus;
