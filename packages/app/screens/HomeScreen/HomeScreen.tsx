import React from "react";
import { Text, Pressable, View } from "dripsy";
import { Account, ID, Client } from "appwrite";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { selectFoldersWithBookmarks } from "app/store/slices/folderSlice";
import { useSelector } from "react-redux";
import TreeView from "app/components/TreeView";

export default function HomeScreen() {
	const { signOut } = usePlatformAuth();
	const bookmarkData = useSelector(selectFoldersWithBookmarks);
	console.log(bookmarkData)
	return (
		<View sx={{ bg: "primary",height:"100%" }}>
			{/* <Pressable onPress={() => signOut()}>
				<Text>Sign Out</Text>
			</Pressable> */}
			<TreeView data={bookmarkData} />
		</View>
	);
}
