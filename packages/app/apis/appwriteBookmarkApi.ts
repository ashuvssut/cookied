// dummy apis
// TODO: create separate useBmShelfStorage hook in which these dummy apis will be kept. The hook will return the dummy apis which will be used in HomeScreen.tsx to get the dummy apis and use them there.
// The main motive of the useBmShelfStorage hook:
// 1. use useQuery hook in useBmShelfStorage hook and return useQuery's loading and error states from the useBmShelfStorage hook to use them in any screen.
// 2. use jotai's LoadingModal useAtom
// 3. use React Native SnackBar from this hook only to show error messages
import { Client, Databases, ID, Query } from "appwrite";

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
import { bookmarkFactory, folderFactory } from "app/utils/factoryFunctions";

const databases = new Databases(client);

// CRUD FOLDERS
export const addFolderInAppwrite = async (
	node: IFolder | null,
	userId: string,
) => {
	try {
		// It means there is no tree node created yet
		if (!node) {
			//Create a tree node and return it
			const rootNode = generateRandomFolder("root", 0, ["root"], true);
			console.log("Root Node", rootNode);
			const folderObject = {
				userId: userId,
				parentId: rootNode.parentId,
				type: rootNode.type,
				path: rootNode.path,
				level: rootNode.level,
				title: rootNode.title,
			};
			console.log("DB ID", APPWRITE_DATABASE_ID, APPWRITE_FOLDER_COLLECTION_ID);
			const response = await databases.createDocument(
				APPWRITE_DATABASE_ID,
				APPWRITE_FOLDER_COLLECTION_ID,
				ID.unique(),
				folderObject,
			);
			console.log("Response from Appwrite", response);
			return folderFactory(response);
		}
		const level = node.level + 1;
		// TODO remove after testing is complete
		const randomFolder = generateRandomFolder(node.$id, level, node.path, true);

		const folderObject = {
			userId: userId,
			parentId: randomFolder.parentId,
			type: randomFolder.type,
			path: randomFolder.path,
			level: randomFolder.level,
			title: randomFolder.title,
		};
		// return randomFolder
		const response = await databases.createDocument(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			ID.unique(),
			folderObject,
		);
		return folderFactory(response);
	} catch (e) {
		console.log("Error in creating new folder", e);
	}
};

export const getFoldersInAppwrite = async (userId: string) => {
	try {
		const allFolders = await databases.listDocuments(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			[Query.equal("userId", [userId])],
		);
		console.log("GET ALL FOLDERS", allFolders);
		return allFolders;
	} catch (e) {
		console.log("Error in getting all folders", e);
	}
};

export const updateFolderInAppwrite = async (id: string, updateData) => {
	try {
		const updatedData = await databases.updateDocument(
			APPWRITE_DATABASE_ID,
			APPWRITE_FOLDER_COLLECTION_ID,
			id,
			JSON.stringify(updateData),
		);
		console.log("Updated Data", updatedData);
	} catch (e) {
		console.log("Error in updating folder", e);
	}
};

// CRUD BOOKMARKS
export const addBookmarkInAppwrite = async (node: IFolder, userId: string) => {
	try {
		const randomBookmark = generateRandomBookmark(
			node.$id,
			node.level,
			node.path,
		);
		const bookmarkObject = {
			userId,
			parentId: randomBookmark.parentId,
			type: randomBookmark.type,
			path: randomBookmark.path,
			level: randomBookmark.level,
			url: randomBookmark.url,
			title: randomBookmark.title,
		};
		const response = await databases.createDocument(
			APPWRITE_DATABASE_ID,
			APPWRITE_BOOKMARK_COLLECTION_ID,
			ID.unique(),
			bookmarkObject,
		);
		console.log("RandomBookmark", randomBookmark);
		return bookmarkFactory(response);
	} catch (e) {
		console.log("Error in creating new bookmark", e);
	}
};
