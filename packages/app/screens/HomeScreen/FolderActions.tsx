import { Pressable, View, useDripsyTheme } from "dripsy";
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
import { usePressabilityApiStyles } from "app/hooks/usePressabilityApiStyles";

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
	const addBm = async (node: IFolder) => {
		if (!session?.userId) return;
		const newBookmark = await addBookmarkInAppwrite(node, session?.userId);
		if (newBookmark !== undefined)
			dispatch(bmShelfAction.addBookmark(newBookmark));
	};
	const addFl = async (node: IFolder | null) => {
		if (!session?.userId) return;
		const newFolder = await addFolderInAppwrite(node, session?.userId);
		if (newFolder !== undefined) dispatch(bmShelfAction.addFolder(newFolder));
	};
	return (
		<View {...props} sx={{ position: "absolute", right: "$3", ...props.sx }}>
			<View sx={{ gap: 5, flexDirection: "row" }}>
				{node && (
					<IconButton onPress={() => addBm(node)}>
						<MdOutlineBookmarkAdd size={22} color={onPrimary} />
					</IconButton>
				)}
				<IconButton onPress={() => addFl(node)}>
					<MdOutlineCreateNewFolder size={22} color={onPrimary} />
				</IconButton>
			</View>
		</View>
	);
};

type PressableProps = ComponentProps<typeof Pressable>;
const IconButton: FC<PressableProps> = ({ children, sx, ...props }) => {
	const style = usePressabilityApiStyles();
	return (
		<Pressable
			sx={{
				p: "$2",
				borderWidth: 1,
				borderRadius: 5,
				userSelect: "none",
				...sx,
			}}
			{...props}
			style={style}
		>
			{children}
		</Pressable>
	);
};
