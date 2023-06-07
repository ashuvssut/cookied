// dummy apis
// TODO: create separate useBmShelfStorage hook in which these dummy apis will be kept. The hook will return the dummy apis which will be used in HomeScreen.tsx to get the dummy apis and use them there.
// The main motive of the useBmShelfStorage hook:
// 1. use useQuery hook in useBmShelfStorage hook and return useQuery's loading and error states from the useBmShelfStorage hook to use them in any screen.
// 2. use jotai's LoadingModal useAtom
// 3. use React Native SnackBar from this hook only to show error messages

import {
	generateRandomBookmark,
	generateRandomFolder,
} from "app/mock/bookmark";
import { IFolder } from "app/store/slices/bookmarkSlice";

export const addFolderInAppwrite = async (node: IFolder | null) => {
	if (!node) return generateRandomFolder("root", 0, ["root"], true);
	// console.log("path", path);
	const level = node.level + 1;
	return generateRandomFolder(node.id, level, node.path, true);

  
};

export const addBookmarkInAppwrite = async (node: IFolder) => {
	return generateRandomBookmark(node.id, node.level, node.path);
};
