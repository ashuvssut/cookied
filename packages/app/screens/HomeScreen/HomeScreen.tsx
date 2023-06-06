import { Text, Pressable, View } from "dripsy";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { useEffect } from "react";
import { bookmarkState } from "app/mock/bookmark";

export default function HomeScreen() {
	const { signOut } = usePlatformAuth();
	useEffect(() => {
		console.log(bookmarkState);
	}, []);
	return (
		<View sx={{ bg: "primary" }}>
			<Pressable onPress={() => signOut()}>
				<Text>Sign Out</Text>
				<Text
				sx={{fontSize:10}}
				>{JSON.stringify(bookmarkState, null, 5)}</Text>
			</Pressable>
		</View>
	);
}
