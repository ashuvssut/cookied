import HomeScreen from "app/screens/HomeScreen";
import { View, Text, useDripsyTheme } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { MotiView } from "moti";

const HomeScreenWithDrawer = () => {
	const linearGradients = useDripsyTheme().theme.linearGradients;
	return (
		<View
			sx={{ position: "relative", backgroundColor: "blue", height: "100%" }}
		>
			<LinearGradient
				colors={linearGradients.menuBackground}
				start={[0, 0.5]}
				end={[1, 0.5]}
				style={{ height: "100%", width: "100%", position: "absolute" }}
			/>
			<HomeScreen />
		</View>
	);
};

export default HomeScreenWithDrawer;
