import { Text, Pressable, View } from "dripsy";
import { FC, useEffect } from "react";
import { IFolder, bmShelfAction } from "app/store/slices/bmShelfSlice";
import { useAppDispatch } from "app/store/hooks";
import {
	addBookmarkInAppwrite,
	addFolderInAppwrite,
	getFoldersInAppwrite,
} from "app/apis/appwriteBookmarkApi";
import { sessionAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";

interface IFolderActions {
	node: IFolder | null;
}
export const FolderActions: FC<IFolderActions> = ({ node }) => {
	const dispatch = useAppDispatch();
	const [session] = useAtom(sessionAtom);
	useEffect(() => {
		if (session?.userId) {
			getFoldersInAppwrite(session?.userId);
		}
	}, []);
	return (
		<View variant="layout.row" sx={{ gap: 10 }}>
			{node && (
				<Pressable
					onPress={async () => {
						if (session?.userId) {
							const newBookmark = await addBookmarkInAppwrite(
								node,
								session?.userId,
							);
							if (newBookmark !== undefined) {
								dispatch(bmShelfAction.addBookmark(newBookmark));
							}
						}
					}}
					sx={{ bg: "secondary" }}
				>
					<Text>Add BM</Text>
				</Pressable>
			)}
			<Pressable
				onPress={async () => {
					if (session?.userId) {
						const newFolder = await addFolderInAppwrite(node, session?.userId);
						if (newFolder !== undefined) {
							dispatch(bmShelfAction.addFolder(newFolder));
						}
					}
				}}
				sx={{ bg: "secondary" }}
			>
				<Text>Add FL</Text>
			</Pressable>
		</View>
	);
};
