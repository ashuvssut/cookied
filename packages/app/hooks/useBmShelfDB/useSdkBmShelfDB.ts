import { useAtom } from "jotai";
import { sessionAtom } from "app/store/slices/auth";
import { Databases, ID, Query, Models } from "appwrite";
import {
	client,
	APPWRITE_BOOKMARK_COLLECTION_ID,
	APPWRITE_FOLDER_COLLECTION_ID,
	APPWRITE_DATABASE_ID,
} from "app/utils/appwrite";
import logr from "app/utils/logr";
import {
	IBookmark,
	IFolder,
	bmShelfAction,
} from "app/store/slices/bmShelfSlice";
import {
	cleanResponse,
	cleanResponseIterative,
} from "app/utils/factoryFunctions";
import _ from "lodash";
import { useAppDispatch } from "app/store/hooks";
import { Update } from "@reduxjs/toolkit";
import { barLoadingAtom } from "app/components/Header";

type TFlData = Omit<
	IFolder,
	"$id" | "$createdAt" | "$updatedAt" | "bookmarks" | "folders"
>;
type TFlDocument = Models.Document & TFlData & { userId: string };
type TBmData = Omit<IBookmark, "$id" | "$createdAt" | "$updatedAt">;
type TBmDocument = Models.Document & TBmData & { userId: string };
export function useSdkBmShelfDB() {
	const [_l, setIsLoading] = useAtom(barLoadingAtom);
	const [session, _s] = useAtom(sessionAtom);
	const userId = session?.userId;
	const dispatch = useAppDispatch();

	const databases = new Databases(client);
	const addFolder = async (flData: TFlData) => {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("User not logged in");
			const reqData = { ...flData, userId };
			const flDoc = await databases.createDocument<TFlDocument>(
				APPWRITE_DATABASE_ID,
				APPWRITE_FOLDER_COLLECTION_ID,
				ID.unique(),
				reqData,
			);
			setIsLoading(false);
			const fl = cleanResponse(flDoc);
			dispatch(bmShelfAction.addFl(fl));
			return fl;
		} catch (e) {
			setIsLoading(false);
			logr("Error in creating new folder", e);
			throw e;
		}
	};

	const getAllFolders = async () => {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("User not logged in");
			const allFlsDocsList = await databases.listDocuments<TFlDocument>(
				APPWRITE_DATABASE_ID,
				APPWRITE_FOLDER_COLLECTION_ID,
				[Query.equal("userId", [userId])],
			);
			setIsLoading(false);
			const folders = cleanResponseIterative(allFlsDocsList.documents);
			dispatch(bmShelfAction.addManyFl(folders));
			return folders;
		} catch (e) {
			setIsLoading(false);
			logr("Error in getting all folders", e);
			throw e;
		}
	};

	const updateFolder = async (fl: Update<IFolder>) => {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("User not logged in");
			const flDoc = await databases.updateDocument<TFlDocument>(
				APPWRITE_DATABASE_ID,
				APPWRITE_FOLDER_COLLECTION_ID,
				String(fl.id),
				fl.changes,
			);
			setIsLoading(false);
			const updatedFl = cleanResponse(flDoc);
			const reduxUpdateDraft = { id: flDoc.$id, changes: updatedFl };
			dispatch(bmShelfAction.updateFl(reduxUpdateDraft));
			return updatedFl;
		} catch (e) {
			setIsLoading(false);
			logr("Error in updating folder", e);
			throw e;
		}
	};

	const deleteFolder = async (fl: IFolder) => {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("User not logged in");
			await databases.deleteDocument(
				APPWRITE_DATABASE_ID,
				APPWRITE_FOLDER_COLLECTION_ID,
				fl.$id,
			);
			dispatch(bmShelfAction.removeFl(fl));
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			logr("Error in deleting folder", e);
			throw e;
		}
	};

	const addBookmark = async (bm: TBmData) => {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("User not logged in");
			const bmDoc = await databases.createDocument<TBmDocument>(
				APPWRITE_DATABASE_ID,
				APPWRITE_BOOKMARK_COLLECTION_ID,
				ID.unique(),
				{ ...bm, userId },
			);
			setIsLoading(false);
			const newBm = cleanResponse(bmDoc);
			dispatch(bmShelfAction.addBm(newBm));
			return newBm;
		} catch (e) {
			setIsLoading(false);
			logr("Error in creating new bookmark", e);
			throw e;
		}
	};

	return { addFolder, getAllFolders, updateFolder, deleteFolder, addBookmark };
}
