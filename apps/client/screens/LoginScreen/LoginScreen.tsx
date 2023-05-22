import { Platform, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "@shopify/restyle";

import Screen from "../../components/Screen";
import { Box, Text } from "../../theme";
import Input from "../../components/Input";
import Button from "../../components/Button";

type Props = {};

const LoginScreen = (props: Props) => {
	const theme = useTheme();
	return (
		<Screen setTopInset={true}>
			<Box
				flex={1}
				backgroundColor={"surface"}
				justifyContent={"center"}
				alignItems={"center"}
				position={"relative"}
			>
				<Box
					backgroundColor={{ phone: "background" }}
					justifyContent={"center"}
					alignItems={"center"}
					width={{phone:"80%",largeScreen:"30%"}}
					height={{phone:"60%",largeScreen:"60%"}}
					borderRadius={20}
					elevation={30}
					shadowColor={"surface"}
				>
					<Text variant={"header"} color={"text"}>
						LOGIN
					</Text>
					<Input />
					<Input />
					<Button onPress={() => console.log("hello")} title="LOGIN" />
				</Box>
			</Box>
		</Screen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
