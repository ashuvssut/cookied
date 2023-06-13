import { View, useDripsyTheme } from "dripsy";
import { ComponentProps, FC } from "react";
import { IFolder, selectFlId } from "app/store/slices/bmShelfSlice";
import {
	MdOutlineBookmarkAdd,
	MdOutlineCreateNewFolder,
} from "app/assets/icons";
import { useBmShelfDB } from "app/hooks/useBmShelfDB/useBmShelfDB";
import { generateBookmarkForApi, generateFolderForApi } from "app/mock/bmShelf";
import { useModal } from "app/components/Modal";
import { IconButton } from "app/components/IconButton";
import { useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";
import { useAppSelector } from "app/store/hooks";

interface IFolderActions extends ComponentProps<typeof View> {
	node: IFolder | null;
	onActionComplete?: () => void;
}
export const FolderActions: FC<IFolderActions> = ({ node, ...props }) => {
	const { addFolder, addBookmark } = useBmShelfDB();
	const { onPrimary } = useDripsyTheme().theme.colors;
	const { onOpen } = useModal();
	const addBm = async () => {
		onOpen("add-bookmark");
		props.onActionComplete?.();
	};
	const addFl = async () => {
		onOpen("add-folder");
		props.onActionComplete?.();
	};
	const [_, setActiveEntityId] = useAtom(activeEntityIdAtom);
	return (
		<View {...props} sx={{ position: "absolute", right: "$3", ...props.sx }}>
			<View sx={{ gap: 5, flexDirection: "row" }}>
				{node && (
					<IconButton
						onPress={() => {
							setActiveEntityId(node.$id);
							addBm(node);
						}}
					>
						<MdOutlineBookmarkAdd size={22} color={onPrimary} />
					</IconButton>
				)}
				<IconButton
					onPress={() => {
						setActiveEntityId(node?.$id ?? null);
						addFl(node);
					}}
					sx={{ borderColor: !node ? "outline" : undefined }}
				>
					<MdOutlineCreateNewFolder size={22} color={onPrimary} />
				</IconButton>
			</View>
		</View>
	);
};
