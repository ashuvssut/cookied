import { ComponentProps } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Visit https://icons.expo.fyi/ to get icon names
export const MdOutlineBookmarkAdd = MdcIcon("bookmark-plus-outline");
export const MdOutlineBookmarkRemove = MdcIcon("bookmark-remove-outline");
export const MdOutlineCreateNewFolder = MdcIcon("folder-plus-outline");
export const MdOutlineOpenInNew = MdcIcon("open-in-new");

export const MdClose = MdIcon("close");
export const MdLock = MdIcon("lock");
export const MdChevronRight = MdIcon("chevron-right");
export const MdFolder = MdIcon("folder");
export const MdMenu = MdIcon("menu");
export const MdFolderOpen = MdIcon("folder-open");
export const MdOutlineBookmarkBorder = MdIcon("bookmark-border");
export const MdArrowUpward = MdIcon("arrow-upward");
export const MdDeleteOutline = MdIcon("delete-outline");
export const MdAccountCircle = MdIcon("account-circle");
export const MdModeEdit = MdIcon("mode-edit");
export const MdSearch = MdIcon("search");
export const MdRefresh = MdIcon("refresh");
export const MdContentPaste = MdIcon("content-paste");

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
