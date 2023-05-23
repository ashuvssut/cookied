import { Button, StyleSheet, View } from "react-native";
import React from "react";

import TScreen from "../../components/TScreen";
import TButton from "../../components/TButton";
import TInput from "../../components/TInput";
import { Box, TText } from "../../theme";
import ScrollScreen from "../../components/ScrollScreen";

type Props = {};

const RegisterScreen = (props: Props) => {
	return (
		<ScrollScreen setTopInset={true}>
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
					height={{ phone: "70%", largeScreen: "60%" }}
					borderRadius={20}
					elevation={30}
					shadowColor={"surface"}
				>
					<TText marginBottom={"s"} variant={"header"} color={"text"}>
						REGISTER
					</TText>
					<TInput placeholder="Enter Name" />
					<TInput placeholder="Enter Email" />
					<TInput placeholder="Enter Password" />
					<TInput placeholder="Confirm Password" />
					<TButton onPress={() => console.log("hello")} title="REGISTER" />
					<TText variant={"body"} color={"text"}>
						OR
					</TText>
					<TButton
						href="/login"
						onPress={() => console.log("hello")}
						title="LOGIN"
					/>
				</Box>
			</Box>
		</ScrollScreen>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});
