import { useAppDispatch } from "app/store/hooks";
import { useMutation, useQuery } from "convex/react";
import { api } from "gconvex/_generated/api";
import { useAtom } from "jotai";
import { TFl } from "gconvex/schema";
import { Toast } from "app/components/Toast";
import { barLoadingAtom } from "app/components/Header";
import logr from "app/utils/logr";
import { bmShelfAction } from "app/store/slices/bmShelfSlice";
import { useUser } from "app/utils/clerk";

export function useBmShelfDb() {
	const { user } = useUser();
	const userId = user?.id;
	const [, setIsLoading] = useAtom(barLoadingAtom);
	const createFl = useMutation(api.bmShelf.folder.create);
	const dispatch = useAppDispatch();

	async function addFolder(newFl: Omit<TFl, "userId">) {
		if (!userId) throw new Error("Please log in first!");
		setIsLoading(true);
		try {
			const reqData = { ...newFl, userId };
			const fl = await createFl(reqData);
			setIsLoading(false);
			dispatch(bmShelfAction.addFl(fl));
			return fl;
		} catch (err) {
			setIsLoading(false);
			const msg = err.message || err.toString();

			Toast.error(!!msg ? msg : "Error in creating new folder");
			logr.err("Error in creating new folder", err);
		}
	}
	return {
		addFolder,
	};
}
