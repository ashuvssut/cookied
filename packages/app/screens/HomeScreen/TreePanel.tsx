/* eslint-disable react/display-name */
import { FC, memo, useEffect, useState } from "react";
import {
	IBookmark,
	IFolder,
	selectDenormalizedBmShelf,
} from "app/store/slices/bmShelfSlice";
import { useAppSelector } from "app/store/hooks";
import { TreeView } from "app/components/TreeView";
import { Text, View, Pressable, useDripsyTheme } from "dripsy";
import { userAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";
import { FolderActions } from "app/screens/HomeScreen/FolderActions";
import {
	MdFolder,
	MdFolderOpen,
	MdOutlineBookmarkBorder,
} from "app/assets/icons";
import { bookmarkState } from "app/mock/bmShelf";
import { ScrollView } from "react-native";
import { usePressabilityApiStyles } from "app/hooks/usePressabilityApiStyles";

export function TreePanel() {
	const foldersWithBookmarks = useAppSelector(selectDenormalizedBmShelf);
	return (
		<View sx={{ flex: 1, minWidth: 400, maxWidth: 500 }}>
			<TreePanelHeader />
			<ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
				<TreeView
					treeData={{
						nodes: foldersWithBookmarks.folders,
						rootLeafs: [] as IBookmark[],
					}}
					// treeData={{
					// 	nodes: bookmarkState.folders,
					// 	rootLeafs: [] as IBookmark[],
					// }}
					isCollapsed
					nodeArrKey="folders"
					leafArrKey="bookmarks"
					renderNode={(node, setCollapse) => (
						<Node node={node} setCollapse={setCollapse} />
					)}
					renderLeaf={node => <LeafNode node={node} />}
				/>
			</ScrollView>
		</View>
	);
}

const TreePanelHeader = () => {
	const user = useAtom(userAtom);
	const whosBms = user[0]?.name ? `${user[0]?.name}'s` : "Your";
	return (
		<View
			variants={["layout.narrowHzTile", "layout.row", "layout.secondary"]}
			sx={{ borderLeftWidth: 0, borderRightWidth: 0, mb: "$2" }}
		>
			<Text variant="overline">{whosBms} Bookmarks</Text>
			<FolderActions node={null} sx={{ py: "$0" }} />
		</View>
	);
};

interface INode {
	node: IFolder;
	setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
const p = 15;
const Node: FC<INode> = memo(
	({ node, setCollapse }) => {
		const style = usePressabilityApiStyles();
		const { onPrimary } = useDripsyTheme().theme.colors;
		const [close, setClose] = useState(false);

		useEffect(() => {
			setCollapse(isCollapsed => {
				setClose(isCollapsed);
				return isCollapsed;
			});
		}, []);

		function openFolder() {
			setCollapse(false);
			setClose(false);
		}

		return (
			<Pressable
				key={"fl" + node.$id}
				variants={["layout.narrowHzTile", "layout.row"]}
				style={style}
				onPress={() => {
					setCollapse(isCollapsed => {
						setClose(!isCollapsed);
						return !isCollapsed;
					});
				}}
			>
				<View variant="layout.row" sx={{ pl: node.level * p, width: "100%" }}>
					<View sx={{ pr: "$3" }}>
						{close ? (
							<MdFolder size={16} color={onPrimary} />
						) : (
							<MdFolderOpen size={16} color={onPrimary} />
						)}
					</View>
					<Text sx={{ top: "$1", py: "$2" }} numberOfLines={1}>
						{node.title}
					</Text>
					<FolderActions node={node} onActionComplete={() => openFolder()} />
				</View>
			</Pressable>
		);
	},
	(prevProps, nextProps) => prevProps.node.title === nextProps.node.title,
);

interface ILeafNode {
	node: IBookmark;
}
const LeafNode: FC<ILeafNode> = memo(
	({ node }) => {
		const { onPrimary } = useDripsyTheme().theme.colors;
		const style = usePressabilityApiStyles();
		return (
			<Pressable
				key={"bm" + node.$id}
				variants={["layout.narrowHzTile", "layout.row"]}
				style={style}
			>
				<View variant="layout.row" sx={{ pl: node.level * p, width: "100%" }}>
					<View sx={{ pr: "$3" }}>
						<MdOutlineBookmarkBorder size={18} color={onPrimary} />
					</View>
					<Text sx={{ top: "$1", py: "$2" }} numberOfLines={1}>
						{node.title}
					</Text>
				</View>
			</Pressable>
		);
	},
	(prevProps, nextProps) => prevProps.node.title === nextProps.node.title,
);
