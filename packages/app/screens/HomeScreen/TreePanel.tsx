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
import { Platform, ScrollView } from "react-native";
import { usePressabilityApiStyles } from "app/hooks/usePressabilityApiStyles";
import { atom } from "jotai";
import { BookmarkActions } from "app/screens/HomeScreen/BookmarkActions";
import { useModal } from "app/components/Modal";
import {
	activeEntityIdAtom,
	hoverFocusEntityIdAtom,
} from "app/store/slices/compoState";

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
					// treeData={{ // Faker data
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
			variants={[
				"layout.narrowHzTile",
				"layout.row",
				"layout.secondary",
				"layout.noBorderX",
			]}
			sx={{ mb: "$2" }}
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
		const [activeEntityId, setActiveEntityId] = useAtom(activeEntityIdAtom);
		const [hfEntityId, setHoverFocusEntityId] = useAtom(hoverFocusEntityIdAtom);
		const showActions = Platform.OS !== "web" || hfEntityId === node.$id;

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
				variants={["layout.narrowHzTile", "layout.row", "layout.noBorderX"]}
				style={style}
				sx={{
					borderColor: activeEntityId === node.$id ? "outline" : undefined,
					backgroundColor: activeEntityId === node.$id ? "#222a" : undefined,
				}}
				onHoverIn={() => setHoverFocusEntityId(node.$id)}
				// onLongPress={() => setHoverFocusEntityId(node.$id)}
				onPress={() => {
					setActiveEntityId(node.$id);
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
						{/* {`${node.title.slice(0, 5)} - ${node.$id} - ${node.parentId}`} */}
					</Text>
					{showActions && (
						<FolderActions node={node} onActionComplete={() => openFolder()} />
					)}
				</View>
			</Pressable>
		);
	},
	(prevProps, nextProps) => prevProps.node.title === nextProps.node.title,
);

export const activeUrlAtom = atom<string | null>(null);
interface ILeafNode {
	node: IBookmark;
}
const LeafNode: FC<ILeafNode> = memo(
	({ node }) => {
		const [_, setActiveUrl] = useAtom(activeUrlAtom);
		const { onPrimary } = useDripsyTheme().theme.colors;
		const style = usePressabilityApiStyles();
		const { onOpen, setPayload } = useModal();
		const [activeEntityId, setActiveEntityId] = useAtom(activeEntityIdAtom);
		const [hfEntityId, setHoverFocusEntityId] = useAtom(hoverFocusEntityIdAtom);
		const showActions = Platform.OS !== "web" || hfEntityId === node.$id;
		return (
			<Pressable
				key={"bm" + node.$id}
				variants={["layout.narrowHzTile", "layout.row", "layout.noBorderX"]}
				style={style}
				onHoverIn={() => setHoverFocusEntityId(node.$id)}
				// onLongPress={() => setHoverFocusEntityId(node.$id)}
				sx={{
					borderColor: activeEntityId === node.$id ? "outline" : undefined,
					backgroundColor: activeEntityId === node.$id ? "#222a" : undefined,
				}}
				onPress={() => {
					setActiveEntityId(node.$id);
					setActiveUrl(node.url);
					if (Platform.OS !== "web") {
						setPayload({ src: node.url });
						onOpen("web-view");
					}
				}}
			>
				<View variant="layout.row" sx={{ pl: node.level * p, width: "100%" }}>
					<View sx={{ pr: "$3" }}>
						<MdOutlineBookmarkBorder size={18} color={onPrimary} />
					</View>
					<Text sx={{ top: "$1", py: "$2" }} numberOfLines={1}>
						{node.title}
						{/* {`${node.title.slice(0, 5)} - ${node.$id} - ${node.parentId}`} */}
					</Text>
					{showActions && <BookmarkActions node={node} />}
				</View>
			</Pressable>
		);
	},
	(prevProps, nextProps) => prevProps.node.title === nextProps.node.title,
);
