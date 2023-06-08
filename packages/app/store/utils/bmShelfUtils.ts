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
		if (fl.parentId === parentId && !visitedIds.has(fl.$id)) {
			visitedIds.add(fl.$id);
			const newFl = { ...fl };
			const newPathId = [...pathId, fl.$id];
			const children = convertToDenormalized(
				flEntities,
				bmEntities,
				fl.$id,
				visitedIds,
				newPathId,
			);
			if (children.length > 0) {
				newFl.folders = children;
			}

			newFl.bookmarks = getBookmarksByPathId(newFl.$id);
			newFl.path = ["root", ...newPathId];
			result.push(newFl);
		}
	}

	return result;
}
