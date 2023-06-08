// dummy apis
// TODO: create separate useBmShelfStorage hook in which these dummy apis will be kept. The hook will return the dummy apis which will be used in HomeScreen.tsx to get the dummy apis and use them there.
// The main motive of the useBmShelfStorage hook:
// 1. use useQuery hook in useBmShelfStorage hook and return useQuery's loading and error states from the useBmShelfStorage hook to use them in any screen.
// 2. use jotai's LoadingModal useAtom
// 3. use React Native SnackBar from this hook only to show error messages
import { Databases, ID, Query, Models } from "appwrite";

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
import { IBookmark, IFolder } from "app/store/slices/bmShelfSlice";
import {
	cleanResponse,
	cleanResponseIterative,
} from "app/utils/factoryFunctions";

const databases = new Databases(client);

// CRUD FOLDERS
type TFolderDocument = Models.Document & IFolder;
export const addFolderInAppwrite = async (
	node: IFolder | null,
	userId: string,
) => {
	try {
		function getFolderObj() {
			if (!node) return generateRandomFolder("root", 0, ["root"], true);
			const { $id, level, path } = node;
			return generateRandomFolder($id, level + 1, [...path, $id], true);
		}
		const { $updatedAt, $createdAt, $id, bookmarks, folders, ...folderData } =
			getFolderObj();
		const folderObject = { userId, ...folderData };
		const response = await databases.createDocument<TFolderDocument>(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			ID.unique(),
			folderObject,
		);

		return cleanResponse(response);
	} catch (e) {
		console.log("Error in creating new folder", e);
	}
};

export const getFoldersInAppwrite = async (userId: string) => {
	try {
		const allFolders = await databases.listDocuments<TFolderDocument>(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			[Query.equal("userId", [userId])],
		);
		// console.log("GET ALL FOLDERS", allFolders);
		return cleanResponseIterative(allFolders);
	} catch (e) {
		console.error("Error in getting all folders", e);
	}
};

export const updateFolderInAppwrite = async (
	id: string,
	updateData: IFolder,
) => {
	try {
		const updatedData = await databases.updateDocument<TFolderDocument>(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			id,
			JSON.stringify(updateData),
		);
		// console.log("Updated Data", updatedData);
	} catch (e) {
		console.error("Error in updating folder", e);
	}
};

// CRUD BOOKMARKS
type TBookmarkDocument = Models.Document & IBookmark;
export const addBookmarkInAppwrite = async (node: IFolder, userId: string) => {
	try {
		const { $id: parentId, level, path } = node;
		const randomBookmark = generateRandomBookmark(parentId, level, path);
		const bookmarkObject = { userId, ...randomBookmark };
		const { $updatedAt, $createdAt, $id, ...bookmarkData } = bookmarkObject;
		const response = await databases.createDocument<TBookmarkDocument>(
			APPWRITE_DATABASE_ID,
			APPWRITE_BOOKMARK_COLLECTION_ID,
			ID.unique(),
			bookmarkData,
		);
		// console.log("RandomBookmark", randomBookmark);
		return cleanResponse(response);
	} catch (e) {
		console.error("Error in creating new bookmark", e);
	}
};
