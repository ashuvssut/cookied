import React from "react";
import { Text, View } from "react-native";

import { useAuth } from "../contexts/Auth";

export default function Index() {
	const { signOut } = useAuth();
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text onPress={() => signOut()}>Sign Out</Text>
		</View>
	);
}
