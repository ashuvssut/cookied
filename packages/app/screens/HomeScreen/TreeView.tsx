import { Text, Pressable, View } from "dripsy";
import { FC } from "react";
import {
	IBookmark,
	IFolder,
	bmShelfAction,
} from "app/store/slices/bookmarkSlice";
import { useAppDispatch } from "app/store/hooks";
import {
	addBookmarkInAppwrite,
	addFolderInAppwrite,
} from "app/apis/appwriteBookmarkApi";

interface ITreeView {
	treeData: { nodes: IFolder[]; rootLeafs: IBookmark[] }; // TODO: infer automatically
	nodeArrKey: string;
	leafArrKey: string;
}
export const TreeView: FC<ITreeView> = ({
	treeData,
	nodeArrKey,
	leafArrKey,
}) => {
	const renderTree = (tree: (typeof treeData)["nodes"]) => {
		return tree.map(node => {
			return (
				<View key={node.id}>
					<Node node={node} />
					{node[nodeArrKey] && renderTree(node[nodeArrKey])}
					{node[leafArrKey] && renderLeaf(node[leafArrKey])}
				</View>
			);
		});
	};
	const renderLeaf = (leaf: (typeof treeData)["rootLeafs"]) => {
		return leaf.map(node => <LeafNode key={node.id} node={node} />);
	};
	// console.log("treeData", treeData);
	return <View>{renderTree(treeData["nodes"])}</View>;
};
interface INode {
	node: IFolder; // TODO: infer automatically
}
const Node: FC<INode> = ({ node }) => {
	return (
		<View>
			<Text
				sx={{ borderWidth: 1, borderColor: "secondary", pl: node.level * 30 }}
			>
				<Text variant="label">FL </Text>
				{/* {node.title} */}
				{node.level} {node.id}
				<br /> {node.parentId}
			</Text>
			<FolderActions node={node} />
		</View>
	);
};
interface ILeafNode {
	node: IBookmark; // TODO: infer automatically
}
const LeafNode: FC<ILeafNode> = ({ node }) => {
	return (
		<View key={node.id}>
			<Text sx={{ pl: (node.level + 1) * 30 }}>
				<Text variant="label">BM </Text>
				{/* {node.title} */}
				{node.level} {node.id}
				<br /> {node.parentId}
			</Text>
		</View>
	);
};

interface IFolderActions {
	node: IFolder | null;
}
export const FolderActions: FC<IFolderActions> = ({ node }) => {
	const dispatch = useAppDispatch();
	return (
		<View
			sx={{ position: "absolute", right: 0, flexDirection: "row", gap: 10 }}
		>
			{node && (
				<Pressable
					onPress={async () => {
						const newBookmark = await addBookmarkInAppwrite(node);
						dispatch(bmShelfAction.addBookmark(newBookmark));
					}}
					sx={{ bg: "secondary" }}
				>
					<Text>Add BM</Text>
				</Pressable>
			)}
			<Pressable
				onPress={async () => {
					const newFolder = await addFolderInAppwrite(node);
					dispatch(bmShelfAction.addFolder(newFolder));
				}}
				sx={{ bg: "secondary" }}
			>
				<Text>Add FL</Text>
			</Pressable>
		</View>
	);
};
