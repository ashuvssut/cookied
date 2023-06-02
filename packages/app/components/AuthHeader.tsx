import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { Box, TText } from "../theme";
import { useSafeArea } from "app/components/SafeArea/useSafeArea";

type Props = { headerName: string };

const AuthHeader = (props: Props) => {
	const inset = useSafeArea();

	return (
		<Text>AuthHeader</Text>
		// <Box
		// 	// style={{ paddingTop: inset.top }}
		// 	height={"10%"}
		// 	// backgroundColor={"accent"}
		// 	alignItems={"center"}
		// 	// paddingHorizontal={{ phone: "m", largeScreen: "xl" }}
		// 	flexDirection={"row"}
		// >
		// 	<Pressable
		// 		hitSlop={30}
		// 		style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
		// 	>
		// 		<Box
		// 			backgroundColor={"background"}
		// 			borderRadius={{ phone: 10, largeScreen: 8 }}
		// 			width={{ phone: 40, largeScreen: 30 }}
		// 			height={{ phone: 40, largeScreen: 30 }}
		// 			marginRight={{ phone: "m", largeScreen: "m" }}
		// 			justifyContent={"center"}
		// 			alignItems={"center"}
		// 			borderColor={"whiteBorder"}
		// 			borderWidth={1}
		// 		>
		// 			{/* <Ionicons name="chevron-back" size={24} color="white" /> */}
		// 		</Box>
		// 	</Pressable>

		// 	<TText variant={"header"} color={"text"}>
		// 		{props.headerName}
		// 	</TText>
		// </Box>
	);
};

export default AuthHeader;
