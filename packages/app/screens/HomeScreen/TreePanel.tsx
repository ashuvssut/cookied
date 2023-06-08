import { FC, memo } from "react";
import {
	IBookmark,
	IFolder,
	selectFoldersWithBookmarks,
} from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import { TreeView } from "app/components/TreeView";
import { Text, View } from "dripsy";
import { userAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";
import { FolderActions } from "app/screens/HomeScreen/FolderActions";

export function TreePanel() {
	const foldersWithBookmarks = useAppSelector(selectFoldersWithBookmarks);
	const user = useAtom(userAtom);
	const whosBms = user[0]?.name ? `${user[0]?.name}'s` : "Your";
	return (
		<View sx={{ flex: 1 }}>
			<View
				variants={["layout.narrowTile", "layout.row"]}
				sx={{ justifyContent: "space-between" }}
			>
				<Text variant="overline">{whosBms} Bookmarks</Text>
				<FolderActions node={null} />
			</View>
			<TreeView
				treeData={{
					nodes: foldersWithBookmarks.folders,
					rootLeafs: [] as IBookmark[],
				}}
				// treeData={{ nodes: bookmarkState.folders, rootLeafs: [] }}
				nodeArrKey="folders"
				leafArrKey="bookmarks"
				renderNode={node => <Node node={node} />}
				renderLeaf={node => <LeafNode node={node} />}
			/>
		</View>
	);
}

interface INode {
	node: IFolder;
}
const p = 15;
const Node: FC<INode> = memo(
	({ node }) => {
		return (
			<View>
				<Text
					sx={{ borderWidth: 1, borderColor: "secondary", pl: node.level * p }}
				>
					<Text variant="label">FL </Text>
					{node.title}
					{/* {node.level} {node.id}
					<br /> {node.parentId} */}
				</Text>
				<FolderActions node={node} />
			</View>
		);
	},
	(prevProps, nextProps) => prevProps.node.title === nextProps.node.title,
);

interface ILeafNode {
	node: IBookmark;
}
const LeafNode: FC<ILeafNode> = memo(
	({ node }) => {
		return (
			<View key={node.$id}>
				<Text sx={{ pl: (node.level + 1) * p }}>
					<Text variant="label">BM </Text>
					{node.title}
					{/* {node.level} {node.id}
				<br /> {node.parentId} */}
				</Text>
			</View>
		);
	},
	(prevProps, nextProps) => prevProps.node.title === nextProps.node.title,
);
