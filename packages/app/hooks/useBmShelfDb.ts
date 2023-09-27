import { useMutation } from "convex/react";
import { api } from "gconvex/_generated/api";
import { useAtom } from "jotai";
import { TBm, TFl } from "gconvex/schema";
import { Toast } from "app/components/Toast";
import { barLoadingAtom } from "app/store/slices/compoState";
import logr from "app/utils/logr";
import { IBookmark, IFolder, IFolderNode } from "app/store/slices/bmShelfSlice";
import { useUser } from "app/utils/clerk";
import { PartialExceptForKeys } from "app/types/utility";

export function useBmShelfDb() {
	const { user } = useUser();
	const userId = user?.id;
	const [, setIsLoading] = useAtom(barLoadingAtom);

	// Folder CRUD
	const createFl = useMutation(api.bmShelf.folder.create);
	async function addFolder(
		newFl: Omit<TFl, "userId" | "bookmarks" | "folders">,
	) {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("Please log in first!");
			const reqData = { ...newFl, userId, bookmarks: [], folders: [] };
			const fl = await createFl(reqData);
			setIsLoading(false);
			// dispatch(bmShelfAction.addFl(fl));
			Toast.success("Folder added!");
			return fl;
		} catch (err: any) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in creating new folder");
			logr.err("Error in creating new folder", err);
		}
	}

	const deleteFl = useMutation(api.bmShelf.folder.remove);
	async function deleteFolder(fl: IFolderNode) {
		const flId = fl._id;
		setIsLoading(true);
		try {
			if (!userId) throw new Error("Please log in first!");
			const id = await deleteFl({ flId });
			setIsLoading(false);
			Toast.success("Folder deleted!");
			return id;
		} catch (err: any) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in deleting folder");
			logr.err("Error in deleting folder", err);
		}
	}

	const updateFl = useMutation(api.bmShelf.folder.update);
	async function updateFolder(
		flUpdate: PartialExceptForKeys<IFolder, ["_id", "type"]>,
	) {
		const { _id: flId, _creationTime: _, userId: _u, ...updates } = flUpdate;
		setIsLoading(true);

		try {
			if (!userId) throw new Error("Please log in first!");

			const updatedFl = await updateFl({ flId, updates });
			setIsLoading(false);
			Toast.success("Folder updated!");
			return updatedFl;
		} catch (err: any) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in updating folder");
			logr.err("Error in updating folder", err);
		}
	}

	// Bookmark CRUD
	const createBm = useMutation(api.bmShelf.bookmark.create);
	async function addBookmark(newBm: Omit<TBm, "userId">) {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("Please log in first!");
			const reqData = { ...newBm, userId };
			const bm = await createBm(reqData);
			setIsLoading(false);
			Toast.success("Bookmark created!");
			return bm;
		} catch (err: any) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in creating new bookmark");
			logr.err("Error in creating new bookmark", err);
		}
	}

	const deleteBm = useMutation(api.bmShelf.bookmark.remove);
	async function deleteBookmark(bm: IBookmark) {
		const bmId = bm._id;
		setIsLoading(true);
		try {
			if (!userId) throw new Error("Please log in first!");
			const id = await deleteBm({ bmId });
			setIsLoading(false);
			Toast.success("Bookmark deleted!");
			return id;
		} catch (err: any) {
			setIsLoading(false);
			const msg = err.message || err.toString();
			Toast.error(!!msg ? msg : "Error in deleting bookmark");
			logr.err("Error in deleting bookmark", err);
		}
	}

	const updateBm = useMutation(api.bmShelf.bookmark.update);
	async function updateBookmark(
		bmUpdate: PartialExceptForKeys<IBookmark, ["_id", "type"]>,
	) {
		const { _id: bmId, _creationTime: _, userId: _u, ...updates } = bmUpdate;
		setIsLoading(true);

		try {
			if (!userId) throw new Error("Please log in first!");
			const updatedFl = await updateBm({ bmId, updates });
			setIsLoading(false);
			Toast.success("Bookmark updated!");
			return updatedFl;
		} catch (err: any) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in updating folder");
			logr.err("Error in updating folder", err);
		}
	}
	return {
		addFolder,
		deleteFolder,
		updateFolder,
		addBookmark,
		deleteBookmark,
		updateBookmark,
	};
}
