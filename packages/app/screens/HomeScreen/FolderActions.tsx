import { Pressable, View, useDripsyTheme } from "dripsy";
import { ComponentProps, FC } from "react";
import { IFolder } from "app/store/slices/bmShelfSlice";
import {
	MdOutlineBookmarkAdd,
	MdOutlineCreateNewFolder,
} from "app/assets/icons";
import { usePressabilityApiStyles } from "app/hooks/usePressabilityApiStyles";
import { useBmShelfDB } from "app/hooks/useBmShelfDB/useBmShelfDB";
import { generateBookmarkForApi, generateFolderForApi } from "app/mock/bmShelf";
import { useModal } from "app/components/Modal";

interface IFolderActions extends ComponentProps<typeof View> {
	node: IFolder | null;
}
export const FolderActions: FC<IFolderActions> = ({ node, ...props }) => {
	const { addFolder, addBookmark } = useBmShelfDB();
	const { onPrimary } = useDripsyTheme().theme.colors;
	const { onOpen } = useModal();
	const addBm = async (parentFl: IFolder) => {
		onOpen("add-bookmark");
		const randomBm = generateBookmarkForApi(parentFl);
		await addBookmark(randomBm);
	};
	const addFl = async (node: IFolder | null) => {
		const randomFl = generateFolderForApi(node);
		await addFolder(randomFl);
	};
	return (
		<View {...props} sx={{ position: "absolute", right: "$3", ...props.sx }}>
			<View sx={{ gap: 5, flexDirection: "row" }}>
				{node && (
					<IconButton onPress={() => addBm(node)}>
						<MdOutlineBookmarkAdd size={22} color={onPrimary} />
					</IconButton>
				)}
				<IconButton
					onPress={() => addFl(node)}
					sx={{ borderColor: !node ? "outline" : undefined }}
				>
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
