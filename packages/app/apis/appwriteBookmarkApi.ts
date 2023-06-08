// dummy apis
// TODO: create separate useBmShelfStorage hook in which these dummy apis will be kept. The hook will return the dummy apis which will be used in HomeScreen.tsx to get the dummy apis and use them there.
// The main motive of the useBmShelfStorage hook:
// 1. use useQuery hook in useBmShelfStorage hook and return useQuery's loading and error states from the useBmShelfStorage hook to use them in any screen.
// 2. use jotai's LoadingModal useAtom
// 3. use React Native SnackBar from this hook only to show error messages
import { Client, Databases, ID } from "appwrite";

import {
	client,
	APPWRITE_BOOKMARK_COLLECTION_ID,
	APPWRITE_FOLDER_COLLECTION_ID,
	APPWRITE_DATABASE_ID,
} from "app/utils/appwrite";
import {
	generateRandomBookmark,
	generateRandomFolder,
} from "app/mock/bookmark";
import { IFolder } from "app/store/slices/bmShelfSlice";

const databases = new Databases(client);

export const addFolderInAppwrite = async (node: IFolder | null, id: string) => {
	try {
		// It means there is no tree node created yet
		if (!node) {
			//Create a tree node and return it
			const rootNode = generateRandomFolder("root", 0, ["root"], true);
			console.log("Root Node", rootNode);
			const folderObject = {
				userId: id,
				parentId: rootNode.parentId,
				type: rootNode.type,
				path: rootNode.path,
				level: rootNode.level,
			};
			console.log("DB ID", APPWRITE_DATABASE_ID, APPWRITE_FOLDER_COLLECTION_ID);
			const response = await databases.createDocument(
				APPWRITE_DATABASE_ID,
				APPWRITE_FOLDER_COLLECTION_ID,
				ID.unique(),
				folderObject,
			);
			console.log("Response from Appwrite", response);
			return {
				$id: response.$id,
				type: response.type,
				parentId: response.parentId,
				path: response.path,
				bookmarks: [],
				folders: [],
				level: response.level,
				title: response.title,
				$createdAt: response.$createdAt,
				$updatedAt: response.$updatedAt,
			};
		}
		const level = node.level + 1;
		// TODO remove after testing is complete
		const randomFolder = generateRandomFolder(node.$id, level, node.path, true);

		const folderObject = {
			userId: id,
			parentId: randomFolder.parentId,
			type: randomFolder.type,
			path: randomFolder.path,
			level: randomFolder.level,
		};
		// return randomFolder
		const response = await databases.createDocument(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			ID.unique(),
			folderObject,
		);
		return {
			$id: response.$id,
			type: response.type,
			parentId: response.parentId,
			path: response.path,
			bookmarks: [],
			folders: [],
			level: response.level,
			title: response.title,
			$createdAt: response.$createdAt,
			$updatedAt: response.$updatedAt,
		};
	} catch (e) {
		console.log("Error in calling Db", e);
	}
};

export const addBookmarkInAppwrite = async (node: IFolder) => {
	return generateRandomBookmark(node.$id, node.level, node.path);
};
