import { Text, Pressable, View } from "dripsy";
import { usePlatformAuth } from "app/hooks/usePlatformAuth";
import { FC, useEffect } from "react";
import { bookmarkState } from "app/mock/bookmark";
import { IBookmark, IFolder } from "app/store/slices/bookmarkSlice";
import { useAppDispatch } from "app/store/hooks";

export default function HomeScreen() {
	const { signOut } = usePlatformAuth();
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(JSON.stringify(bookmarkState, null, 2));
	}, []);

	return (
		<View sx={{ bg: "primary" }}>
			<Pressable onPress={() => signOut()}>
				<Text>Sign Out</Text>
			</Pressable>
			<TreeView
				data={bookmarkState}
				nodeArrKey="folders"
				leafArrKey="bookmarks"
			/>
		</View>
	);
}

interface ITreeView {
	data: { folders: IFolder[] };
	/** Nodes Array key */
	nodeArrKey: string;
	/** Leaf Nodes Array key */
	leafArrKey: string;
}
export const TreeView: FC<ITreeView> = ({
	data: treeData,
	nodeArrKey,
	leafArrKey,
}) => {
	const renderTree = (tree: IFolder[]) => {
		return tree.map(node => {
			return (
				<View key={node.id}>
					<Text
						variant="semibold"
						sx={{
							borderWidth: 1,
							borderColor: "secondary",
							pl: node.level * 30,
						}}
					>
						<Text variant="label">FL </Text>
						{node.title}
					</Text>
					{node[nodeArrKey] && renderTree(node[nodeArrKey])}
					{node[leafArrKey] && renderLeaf(node[leafArrKey])}
				</View>
			);
		});
	};
	const renderLeaf = (leaf: IBookmark[]) => {
		return leaf.map(node => {
			return (
				<View key={node.id}>
					<Text variant="semibold" sx={{ pl: (node.level + 1) * 30 }}>
						<Text variant="label">BM </Text>
						{node.title}
					</Text>
				</View>
			);
		});
	};
	return <View>{renderTree(treeData.folders)}</View>;
};
