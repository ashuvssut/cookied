import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Box, TText } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
	headerName: string;
};

const AuthHeader = (props: Props) => {
	const inset = useSafeAreaInsets();

	return (
		<Box
			// style={{ paddingTop: inset.top }}
			height={"10%"}
			// backgroundColor={"accent"}
			alignItems={"center"}
			// paddingHorizontal={{ phone: "m", largeScreen: "xl" }}
			flexDirection={"row"}
		>
			<TouchableOpacity hitSlop={30}>
				<Box
					backgroundColor={"background"}
					borderRadius={{ phone: 10, largeScreen: 8 }}
					width={{ phone: 40, largeScreen: 30 }}
					height={{ phone: 40, largeScreen: 30 }}
					marginRight={{ phone: "m", largeScreen: "m" }}
					justifyContent={"center"}
					alignItems={"center"}
					borderColor={"whiteBorder"}
					borderWidth={1}
				>
					<Ionicons name="chevron-back" size={24} color="white" />
				</Box>
			</TouchableOpacity>

			<TText variant={"header"} color={"text"}>
				{props.headerName}
			</TText>
		</Box>
	);
};

export default AuthHeader;

const styles = StyleSheet.create({});
