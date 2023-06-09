import { View, useDripsyTheme } from "dripsy";
import { ComponentProps, FC, useEffect } from "react";
import { IFolder, bmShelfAction } from "app/store/slices/bmShelfSlice";
import { useAppDispatch } from "app/store/hooks";
import {
	addBookmarkInAppwrite,
	addFolderInAppwrite,
	getFoldersInAppwrite,
} from "app/apis/appwriteBookmarkApi";
import { sessionAtom } from "app/store/slices/auth";
import { useAtom } from "jotai";
import {
	MdOutlineBookmarkAdd,
	MdOutlineCreateNewFolder,
} from "app/assets/icons";
import { Th } from "app/theme/components";

interface IFolderActions extends ComponentProps<typeof View> {
	node: IFolder | null;
}
export const FolderActions: FC<IFolderActions> = ({ node, ...props }) => {
	const dispatch = useAppDispatch();
	const [session] = useAtom(sessionAtom);
	useEffect(() => {
		if (session?.userId) {
			getFoldersInAppwrite(session?.userId);
		}
	}, []);
	const { onPrimary } = useDripsyTheme().theme.colors;
	return (
		<View {...props} sx={{ position: "absolute", right: "$3", ...props.sx }}>
			<View sx={{ flexDirection: "row" }}>
				{node && (
					<Th.IconButton
						onPress={async ({}) => {
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
					>
						<MdOutlineBookmarkAdd size={22} color={onPrimary} />
					</Th.IconButton>
				)}
				<Th.IconButton
					onPress={async () => {
						if (session?.userId) {
							const newFolder = await addFolderInAppwrite(
								node,
								session?.userId,
							);
							if (newFolder !== undefined) {
								dispatch(bmShelfAction.addFolder(newFolder));
							}
						}
					}}
				>
					<MdOutlineCreateNewFolder size={22} color={onPrimary} />
				</Th.IconButton>
			</View>
		</View>
	);
};
