import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
//Named file used for better search ability (i.e one can easily search LoginScreen rather than searching index.tsx and getting confused)
type Props = {};

const LoginScreen = (props: Props) => {
	return (
		<View style={{ paddingTop: 20 }}>
			<Text>LoginScreen</Text>
			<Link href="/register" asChild>
				<Pressable>
					{({ hovered, pressed }) => <Text>Go To Register</Text>}
				</Pressable>
			</Link>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
