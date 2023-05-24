import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function HomeScreen() {
	const { signOut } = useAuth();
	return (
		<TouchableOpacity
			onPress={() => signOut()}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Sign Out</Text>
		</TouchableOpacity>
	);
}
