import { Platform, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "@shopify/restyle";

import TScreen from "../../components/TScreen";
import { Box, TText } from "../../theme";
import TInput from "../../components/TInput";
import TButton from "../../components/TButton";
import { useSendIntent } from "../../hooks/useSendIntent";
import { useEffect } from "react";
type Props = {};

const LoginScreen = (props: Props) => {
	const theme = useTheme();

	const { sharedData, sharedExtraData, sharedMimeType } = useSendIntent();
	useEffect(() => {
		console.log("sharedData", sharedData);
		console.log("sharedExtraData", sharedExtraData);
		console.log("sharedMimeType", sharedMimeType);
	}, [sharedData, sharedExtraData, sharedMimeType]);

	return (
		<TScreen setTopInset={true}>
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
					width={{ phone: "80%", largeScreen: "30%" }}
					height={{ phone: "60%", largeScreen: "60%" }}
					borderRadius={20}
					elevation={30}
					shadowColor={"surface"}
				>
					<TText marginBottom={"s"} variant={"header"} color={"text"}>
						LOGIN
					</TText>
					<TInput placeholder="Enter Email" />
					<TInput placeholder="Enter Password" />
					<TButton
						height={50}
						onPress={() => console.log("Hello")}
						title="LOGIN"
					/>
					<TText variant={"body"} color={"text"}>
						OR
					</TText>
					<TButton
						height={50}
						href="/register"
						onPress={() => console.log("hello")}
						title="REGISTER"
					/>
				</Box>
			</Box>
		</TScreen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
