// Bookmark Shelf Slice
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../types";

export interface IBookmark {
	type: "bookmark";
	id: string;
	parentId: string;
	path: string[];
	level: number;
	title: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

export interface IFolder {
	type: "folder";
	id: string;
	parentId: string;
	path: string[];
	level: number;
	bookmarks: IBookmark[];
	folders: IFolder[];
	title: string;
	createdAt: string;
	updatedAt: string;
}

const foldersAdapter = createEntityAdapter<IFolder>({
	selectId: folder => folder.id,
	sortComparer: (a, b) => a.title.localeCompare(b.title), // TODO: expt:- chech if changin title to something else using jotai to something gives us sort ability or not (else create selectors)
});

const bookmarksAdapter = createEntityAdapter<IBookmark>({
	selectId: bookmark => bookmark.id,
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = {
	bookmarks: bookmarksAdapter.getInitialState(),
	folders: foldersAdapter.getInitialState(),
};
export type TBmShelf = typeof initialState;
export const bmShelfSlice = createSlice({
	name: "bmShelf",
	initialState,
	reducers: {
		addFolder: {
			reducer: (state, action: PayloadAction<IFolder>) => {
				foldersAdapter.addOne(state.folders, action.payload);
			},
			prepare: (folder: IFolder) => ({ payload: folder }),
		},
		addBookmark: {
			reducer: (state, action: PayloadAction<IBookmark>) => {
				bookmarksAdapter.addOne(state.bookmarks, action.payload);
			},
			prepare: (bookmark: IBookmark) => ({ payload: bookmark }),
		},
		addManyBm: (state, action: PayloadAction<IBookmark[]>) => {
			bookmarksAdapter.addMany(state.bookmarks, action.payload);
		},
		addManyFl: (state, action: PayloadAction<IFolder[]>) => {
			foldersAdapter.addMany(state.folders, action.payload);
		},
	},
	extraReducers: builder => {},
});

export const { actions: bmShelfAction } = bmShelfSlice;
export default bmShelfSlice.reducer;

export const {} = bookmarksAdapter.getSelectors<RootState>(
	state => state.bmShelf.bookmarks,
);

export const { selectAll: selectAllFolders } =
	foldersAdapter.getSelectors<RootState>(state => state.bmShelf.folders);
export const { selectAll: selectAllBookmarks } =
	bookmarksAdapter.getSelectors<RootState>(state => state.bmShelf.bookmarks);

export const selectFoldersWithBookmarks = createSelector(
	(state: RootState) => state.bmShelf,
	(shelf: TBmShelf) => {
		const bookmarkEntities = shelf.bookmarks.entities;
		const folderEntities = shelf.folders.entities;
		console.log("bookmarkEntities", JSON.stringify(bookmarkEntities, null, 2));
		console.log("folderEntities", JSON.stringify(folderEntities, null, 2));

		function getBookmarksByPathId(parentId: string) {
			const result: IBookmark[] = [];
			for (const bmId in bookmarkEntities) {
				const bm = bookmarkEntities[bmId]!;
				if (bm.parentId === parentId) result.push(bm);
			}
			return result;
		}

		function convertToDenormalized(
			flEntities: typeof folderEntities,
			parentId = "root",
			visitedIds = new Set(),
			pathId: string[] = [],
		) {
			const result: IFolder[] = [];
			for (const flId in flEntities) {
				const fl = flEntities[flId]!;
				if (fl.parentId === parentId && !visitedIds.has(fl.id)) {
					visitedIds.add(fl.id);
					const newFl = { ...fl };
					const newPathId = [...pathId, fl.id];
					const children = convertToDenormalized(
						flEntities,
						fl.id,
						visitedIds,
						newPathId,
					);
					if (children.length > 0) {
						newFl.folders = children;
					}

					newFl.bookmarks = getBookmarksByPathId(newFl.id);
					newFl.path = ["root", ...newPathId];
					result.push(newFl);
				}
			}

			return result;
		}
		return { folders: convertToDenormalized(folderEntities) }; // denormalizedJson;
	},
);
