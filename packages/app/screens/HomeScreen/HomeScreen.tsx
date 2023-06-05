import React from "react";
import { Text, Pressable } from "react-native";
import { Account, ID, Client } from "appwrite";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";

export default function HomeScreen() {
	const { signOut } = usePlatformAuth();
	return (
		<Pressable
			onPress={() => signOut()}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Sign Out</Text>
		</Pressable>
	);
}
