import { useEffect } from "react";
import { selectFoldersWithBookmarks } from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import { resetReduxPersist_reload } from "app/utils/storage";
import { FolderActions, TreeView } from "app/components/TreeView";
import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { View } from "dripsy";
import { WebpageView } from "app/screens/HomeScreen/WebpageView";

export default function HomeScreen() {
	useEffect(() => {
		window["reset"] = resetReduxPersist_reload;
		// window["addMany"] = execAddMany;
		// window["addMany2"] = execAddManyFl;
		// console.log(JSON.stringify(bookmarkState, null, 2));
	}, []);

	return (
		<Screen>
			<Header />
			<View sx={{ flexDirection: "row" }}>
				<TreePanel />
				<WebpageView />
			</View>
		</Screen>
	);
}

function TreePanel() {
	const foldersWithBookmarks = useAppSelector(selectFoldersWithBookmarks);
	return (
		<View sx={{ flex: 1 }}>
			<FolderActions node={null} />
			<TreeView
				treeData={{ nodes: foldersWithBookmarks.folders, rootLeafs: [] }}
				// treeData={{ nodes: bookmarkState.folders, rootLeafs: [] }}
				nodeArrKey="folders"
				leafArrKey="bookmarks"
			/>
		</View>
	);
}
