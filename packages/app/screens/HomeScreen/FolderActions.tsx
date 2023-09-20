import { View, useDripsyTheme } from "dripsy";
import { ComponentProps, FC } from "react";
import { IFolder } from "app/store/slices/bmShelfSlice";
import {
	MdDeleteOutline,
	MdModeEdit,
	MdOutlineBookmarkAdd,
	MdOutlineCreateNewFolder,
} from "app/assets/icons";
import { useBmShelfDb } from "app/hooks/useBmShelfDb";
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
	const { deleteFolder } = useBmShelfDb();
	const { onPrimary } = useDripsyTheme().theme.colors;
	const { openModal } = useModal();
	const addBm = async () => {
		openModal({ type: "add-bookmark", payload: { sharedBmUrl: null } });
		props.onActionComplete?.();
	};
	const editFl = async () => {
		openModal({ type: "edit-folder" });
		props.onActionComplete?.();
	};
	const addFl = async () => {
		openModal({ type: "add-folder", payload: { parentFl: node } });
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
								setActiveEntityId(node._id);
								editFl();
							}}
						>
							<MdModeEdit size={22} color={onPrimary} />
						</IconButton>
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
								setActiveEntityId(node._id);
								addBm();
							}}
						>
							<MdOutlineBookmarkAdd size={22} color={onPrimary} />
						</IconButton>
					</>
				)}
				<IconButton
					onPress={() => {
						setActiveEntityId(node?._id ?? null);
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
