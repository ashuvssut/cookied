import HomeScreen from "app/screens/HomeScreen";
import { View, Text, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { userAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";
import { Th } from "app/theme/components";
import { usePlatformAuth } from "app/hooks/useAuth";

const HomeScreenWithDrawer = () => {
	const [user] = useAtom(userAtom);
	const { signOut } = usePlatformAuth();
	const { linearGradients } = useDripsyTheme().theme;
	const { width } = useWindowDimensions();

	return (
		<View sx={{ position: "relative", height: "100%", flexDirection: "row" }}>
			<LinearGradient
				colors={linearGradients.surfaceGradientBg}
				start={[0, 0.5]}
				end={[1, 0.5]}
				style={{ height: "100%", width: "100%", position: "absolute" }}
			/>
			<View
				sx={{
					height: "100%",
					width: "100%",
					position: "absolute",
					flexDirection: "row",
				}}
			>
				<View sx={{ width: width / 2 }} />
				<View sx={{ flex: 1, mx: 20, py: 60 }}>
					<View sx={{ flexDirection: "row", gap: 10, pt: 30 }}>
						<Avatar />
						<View sx={{ justifyContent: "center" }}>
							<Text variant="semibold" sx={{ fontSize: 22, lineHeight: 30 }}>
								Hi
							</Text>
							<Text variant="semibold">{user?.name}</Text>
						</View>
					</View>
					<View
						sx={{ bg: "#888", height: StyleSheet.hairlineWidth, mt: "$4" }}
					/>
					<View sx={{ flex: 1 }} />
					<Th.ButtonPrimary
						onPress={signOut}
						sx={{ flex: 1, marginBottom: "$5" }}
					>
						LOGOUT
					</Th.ButtonPrimary>
				</View>
			</View>
			<HomeScreen />
		</View>
	);
};

export default HomeScreenWithDrawer;

function Avatar() {
	const [user] = useAtom(userAtom);

	return (
		<View
			variant="layout.secondary"
			sx={{
				width: 60,
				height: 60,
				borderRadius: 60,
				overflow: "hidden",
				justifyContent: "center",
				alignItems: "center",
				bg: "#434343",
			}}
		>
			<Text sx={{ fontSize: 35 }} variant="semibold">
				{user?.name.charAt(0).toUpperCase()}
			</Text>
		</View>
	);
}
