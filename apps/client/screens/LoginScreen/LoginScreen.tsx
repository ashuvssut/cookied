import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

import Screen from "../../components/Screen";

type Props = {};

const LoginScreen = (props: Props) => {
	return (
		<Screen>
			<Text>LoginScreen</Text>
			<Link href="/register" asChild>
				<Pressable>
					{({ hovered, pressed }) => <Text>Go To Register</Text>}
				</Pressable>
			</Link>
		</Screen>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
