import React from "react";
import { Text, Pressable } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function HomeScreen() {
	const { signOut } = useAuth();
	return (
		<Pressable
			onPress={() => signOut()}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Sign Out</Text>
		</Pressable>
	);
}
