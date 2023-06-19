import { View, useDripsyTheme } from "dripsy";
import { ComponentProps, FC } from "react";
import { IFolder } from "app/store/slices/bmShelfSlice";
import {
	MdDeleteOutline,
	MdOutlineBookmarkAdd,
	MdOutlineCreateNewFolder,
} from "app/assets/icons";
import { useBmShelfDB } from "app/hooks/useBmShelfDB/useBmShelfDB";
import { useModal } from "app/components/Modal";
import { IconButton } from "app/components/IconButton";
import { useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";

interface IFolderActions extends ComponentProps<typeof View> {
	/** Current node */
	node: IFolder | null;
	onActionComplete?: () => void;
}
export const FolderActions: FC<IFolderActions> = ({ node, ...props }) => {
	const { deleteFolder } = useBmShelfDB();
	const { onPrimary } = useDripsyTheme().theme.colors;
	const { onOpen } = useModal();
	const addBm = async () => {
		onOpen({ type: "add-bookmark", payload: { sharedData: null } });
		props.onActionComplete?.();
	};
	const addFl = async () => {
		onOpen({
			type: "add-folder",
			payload: { parentId: node?.$id ?? null },
		});
		props.onActionComplete?.();
	};
	const [_, setActiveEntityId] = useAtom(activeEntityIdAtom);
	return (
		<View {...props} sx={{ position: "absolute", right: "$3", ...props.sx }}>
			<View sx={{ gap: 5, flexDirection: "row" }}>
				{node && (
					<>
						<IconButton
							onPress={() => {
								setActiveEntityId(null);
								deleteFolder(node);
							}}
							sx={{ borderColor: !node ? "outline" : undefined }}
						>
							<MdDeleteOutline size={22} color={onPrimary} />
						</IconButton>
						<IconButton
							onPress={() => {
								setActiveEntityId(node.$id);
								addBm();
							}}
						>
							<MdOutlineBookmarkAdd size={22} color={onPrimary} />
						</IconButton>
					</>
				)}
				<IconButton
					onPress={() => {
						setActiveEntityId(node?.$id ?? null);
						addFl();
					}}
					sx={{ borderColor: !node ? "outline" : undefined }}
				>
					<MdOutlineCreateNewFolder size={22} color={onPrimary} />
				</IconButton>
			</View>
		</View>
	);
};
