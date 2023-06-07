import { Text, Pressable, View } from "dripsy";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { useEffect } from "react";
import { bookmarkState } from "app/mock/bookmark";
import {
	selectAllBookmarks,
	selectAllFolders,
	selectFoldersWithBookmarks,
} from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import { resetReduxPersist_reload } from "app/utils/storage";
import { FolderActions, TreeView } from "app/screens/HomeScreen/TreeView";
export default function HomeScreen() {
	const { signOut } = usePlatformAuth();
	const folders = useAppSelector(selectAllFolders);
	const bookmarks = useAppSelector(selectAllBookmarks);
	const foldersWithBookmarks = useAppSelector(selectFoldersWithBookmarks);
	useEffect(() => {
		window["reset"] = resetReduxPersist_reload;
		// console.log(JSON.stringify(bookmarkState, null, 2));
	}, []);
	// useEffect(() => {
	// 	console.log("folders", JSON.stringify(folders, null, 2));
	// 	console.log("bookmarks", JSON.stringify(bookmarks, null, 2));
	// }, [folders, bookmarks]);

	return (
		<View sx={{ bg: "primary" }}>
			<Pressable onPress={() => signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
			<FolderActions node={null} />
			<TreeView
				treeData={{ nodes: folders, rootLeafs: bookmarks }}
				// treeData={{ nodes: foldersWithBookmarks, leafs: [] }}
				// treeData={{ nodes: bookmarkState.folders, leafs: [] }}
				nodeArrKey="folders"
				leafArrKey="bookmarks"
			/>
		</View>
	);
}
