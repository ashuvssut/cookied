import { ComponentProps } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Visit https://icons.expo.fyi/ to get icon names
export const MdOutlineBookmarkAdd = MdcIcon("bookmark-plus-outline");
export const MdOutlineBookmarkRemove = MdcIcon("bookmark-remove-outline");
export const MdOutlineCreateNewFolder = MdcIcon("folder-plus-outline");

export const MdChevronRight = MdIcon("chevron-right");
export const MdFolder = MdIcon("folder");
export const MdFolderOpen = MdIcon("folder-open");
export const MdOutlineBookmarkBorder = MdIcon("bookmark-border");

// Typed Factory Functions
type MdcProps = ComponentProps<typeof MaterialCommunityIcons>;
function MdcIcon(name: MdcProps["name"]) {
	const _MdcIcon = (props: Omit<MdcProps, "name">) => {
		return <MaterialCommunityIcons name={name} {...props} />;
	};
	return _MdcIcon;
}

type MdProps = ComponentProps<typeof MaterialIcons>;
function MdIcon(name: MdProps["name"]) {
	const _MdIcon = (props: Omit<MdProps, "name">) => {
		return <MaterialIcons name={name} {...props} />;
	};
	return _MdIcon;
}
