import { View, useDripsyTheme } from "dripsy";
import { ComponentProps, FC } from "react";
import { IBookmark } from "app/store/slices/bmShelfSlice";
import { MdOutlineOpenInNew } from "app/assets/icons";
import { openURL } from "expo-linking";
import { IconButton } from "app/components/IconButton";
import { Platform } from "react-native";
import { useAtom } from "jotai";
import { activeEntityIdAtom } from "app/store/slices/compoState";

interface IBookmarkActions extends ComponentProps<typeof View> {
	node: IBookmark;
}
export const BookmarkActions: FC<IBookmarkActions> = ({ node, ...props }) => {
	const { onPrimary } = useDripsyTheme().theme.colors;
	const [_, setActiveEntityId] = useAtom(activeEntityIdAtom);

	return (
		<View {...props} sx={{ position: "absolute", right: "$3", ...props.sx }}>
			<View sx={{ gap: 5, flexDirection: "row" }}>
				<IconButton
					onPress={() => {
						setActiveEntityId(node.$id);
						if (Platform.OS === "web") {
							window.open(node.url, "_blank");
							return;
						}
						openURL(node.url);
					}}
					sx={{ borderColor: !node ? "outline" : undefined }}
				>
					<MdOutlineOpenInNew size={22} color={onPrimary} />
				</IconButton>
			</View>
		</View>
	);
};
