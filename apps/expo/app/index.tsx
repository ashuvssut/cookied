import HomeScreen from "app/screens/HomeScreen";
import { View, Text, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Directions } from "react-native-gesture-handler";
import { userAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";
import { Th } from "app/theme/components";
import { usePlatformAuth } from "app/hooks/useAuth";

const HomeScreenWithDrawer = () => {
	const [user] = useAtom(userAtom);
	const { signOut } = usePlatformAuth();
	const linearGradients = useDripsyTheme().theme.linearGradients;
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
					display: "flex",
					flexDirection: "row",
				}}
			>
				<View sx={{ flex: 5.5 }} />
				<View sx={{ flex: 4.5, marginHorizontal: 20, paddingTop: 60 }}>
					<View
						sx={{
							width: 120,
							height: 120,
							borderRadius: 60,
							overflow: "hidden",
							borderColor: "white",
							borderWidth: 1,
							justifyContent: "center",
							alignItems: "center",
							marginBottom: 20,
						}}
					>
						<LinearGradient
							colors={["#000000", "#923CB5"]}
							start={[0, 0.5]}
							end={[1, 0.5]}
							style={{ height: "100%", width: "100%", position: "absolute" }}
						/>
						<Text sx={{ fontSize: 60 }}>
							{user?.name.charAt(0).toUpperCase()}
						</Text>
					</View>
					<View
						sx={{
							borderColor: "white",
							borderBottomWidth: StyleSheet.hairlineWidth,
							marginBottom: 20,
						}}
					/>
					<Text sx={{ fontSize: 25, lineHeight: 27, fontWeight: "300" }}>
						Hi {user?.name}
					</Text>
					<View sx={{ flex: 1 }} />
					<Th.ButtonPrimary
						onPress={() => signOut()}
						sx={{ flex: 1, marginBottom: "$5", }}
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
