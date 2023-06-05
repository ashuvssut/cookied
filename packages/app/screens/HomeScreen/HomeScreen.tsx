import React from "react";
import { Text, Pressable, View } from "dripsy";
import { Account, ID, Client } from "appwrite";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";

export default function HomeScreen() {
	const { signOut } = usePlatformAuth();
	return (
		<View sx={{ bg: "primary" }}>
			<Pressable onPress={() => signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
		</View>
	);
}
