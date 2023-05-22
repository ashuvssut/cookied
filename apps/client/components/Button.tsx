import React from "react";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../theme";

const Button = ({ title, onPress }) => {
	const theme = useTheme();

	return (
		<TouchableOpacity style={{ width: "80%", height: "10%" }} onPress={onPress}>
			<Box
				justifyContent={"center"}
				alignItems={"center"}
				backgroundColor="primary"
				flex={1}
				borderRadius={2}
			>
				<Text
					variant="button"
					color={{ phone: "white", largeScreen: "accent" }}
				>
					{title}
				</Text>
			</Box>
		</TouchableOpacity>
	);
};

export default Button;
