import { Dictionary } from "@reduxjs/toolkit";
import { IBookmark, IFolder } from "app/store/slices/bmShelfSlice";

export function convertToDenormalized(
	flEntities: Dictionary<IFolder>,
	bmEntities: Dictionary<IBookmark>,
	parentId = "root",
	visitedIds = new Set(),
	pathId: string[] = [],
) {
	function getBookmarksByPathId(parentId: string) {
		const result: IBookmark[] = [];
		for (const bmId in bmEntities) {
			const bm = bmEntities[bmId]!;
			if (bm.parentId === parentId) result.push(bm);
		}
		return result;
	}
	const result: IFolder[] = [];
	for (const flId in flEntities) {
		const fl = flEntities[flId]!;
		if (fl.parentId === parentId && !visitedIds.has(fl._id)) {
			visitedIds.add(fl._id);
			const newFl = { ...fl };
			const children = convertToDenormalized(
				flEntities,
				bmEntities,
				fl._id,
				visitedIds,
				[...pathId, fl._id],
			);
			if (children.length > 0) {
				newFl.folders = children as any;
			}

			newFl.bookmarks = getBookmarksByPathId(newFl._id) as any;
			// newFl.path = ["root", ...pathId, newFl._id];
			newFl.path = ["root", ...pathId];
			result.push(newFl);
		}
	}

	return result;
}
