import HomeScreen from "app/screens/HomeScreen";
import { Avatar } from "app/components/Avatar";
import { View, Text, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { Th } from "app/theme/components";
import { useAuth, useUser } from "app/utils/clerk";
import { useRouter } from "solito/router";
import { Toast } from "app/components/Toast";
import { useSignOut } from "app/hooks/useSignOut";

const HomeScreenWithDrawer = () => {
	const { user } = useUser();
	const { isLoaded } = useAuth();
	const { signOut } = useSignOut();
	const { linearGradients } = useDripsyTheme().theme;
	const { width } = useWindowDimensions();
	const router = useRouter();

	return (
		<View sx={{ position: "relative", height: "100%" }}>
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
							<Text variant="semibold">{user?.firstName}</Text>
						</View>
					</View>
					<View
						sx={{ bg: "#888", height: StyleSheet.hairlineWidth, mt: "$4" }}
					/>
					<View sx={{ flex: 1 }} />
					{isLoaded && (
						<Th.ButtonPrimary
							onPress={async () => {
								try {
									await signOut();
								} catch (err) {
									Toast.error("Unable to Log out.");
									console.log(err.message || err.toString());
								}
								router.replace({ pathname: "/" });
							}}
							sx={{ flex: 1, marginBottom: "$5" }}
						>
							LOGOUT
						</Th.ButtonPrimary>
					)}
				</View>
			</View>
			<HomeScreen />
		</View>
	);
};

export default HomeScreenWithDrawer;
