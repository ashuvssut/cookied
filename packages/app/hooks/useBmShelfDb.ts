import { useAppDispatch } from "app/store/hooks";
import { useMutation, useQuery } from "convex/react";
import { api } from "gconvex/_generated/api";
import { useAtom } from "jotai";
import { TBm, TFl } from "gconvex/schema";
import { Toast } from "app/components/Toast";
import { barLoadingAtom } from "app/components/Header";
import logr from "app/utils/logr";
import { bmShelfAction } from "app/store/slices/bmShelfSlice";
import { useUser } from "app/utils/clerk";

export function useBmShelfDb() {
	const { user } = useUser();
	const userId = user?.id;
	const [, setIsLoading] = useAtom(barLoadingAtom);
	const dispatch = useAppDispatch();

  // Folder CRUD
	const createFl = useMutation(api.bmShelf.folder.create);
	async function addFolder(newFl: Omit<TFl, "userId">) {
		setIsLoading(true);
		try {
			if (!userId) throw new Error("Please log in first!");
			const reqData = { ...newFl, userId };
			const fl = await createFl(reqData);
			setIsLoading(false);
			// dispatch(bmShelfAction.addFl(fl));
			return fl;
		} catch (err) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in creating new folder");
			logr.err("Error in creating new folder", err);
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
			return bm;
		} catch (err) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in creating new bookmark");
			logr.err("Error in creating new bookmark", err);
		}
	}
	return {
		addFolder,
		addBookmark,
	};
}
