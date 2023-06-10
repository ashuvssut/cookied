// Bookmark Shelf Slice
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction as PA,
	Update,
} from "@reduxjs/toolkit";
import { RootState } from "../types";
import { convertToDenormalized } from "app/store/utils/bmShelfUtils";

const foldersAdapter = createEntityAdapter<IFolder>({
	selectId: folder => folder.$id,
	sortComparer: (a, b) => a.title.localeCompare(b.title), // TODO: expt:- check if changin title to something else using jotai to something gives us sort ability or not (else create selectors)
});

const bookmarksAdapter = createEntityAdapter<IBookmark>({
	selectId: bookmark => bookmark.$id,
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
		// Folder CRUD
		addFl: {
			reducer: (state, action: PA<IFolder>) =>
				void foldersAdapter.addOne(state.folders, action.payload),
			prepare: (folder: Omit<IFolder, "bookmarks" | "folders">) => ({
				payload: { ...folder, bookmarks: [], folders: [] },
			}),
		},
		addManyFl: {
			reducer: (state, action: PA<IFolder[]>) =>
				void foldersAdapter.addMany(state.folders, action.payload),
			prepare: (folders: Omit<IFolder, "bookmarks" | "folders">[]) => ({
				payload: folders //
					.map(folder => ({ ...folder, bookmarks: [], folders: [] })),
			}),
		},
		updateFl: (state, action: PA<Update<IFolder>>) =>
			void foldersAdapter.updateOne(state.folders, action.payload),
		removeFl: (state, action: PA<IFolder>) =>
			void foldersAdapter.removeOne(state.folders, action.payload.$id),

		// Bookmark CRUD
		addBm: (state, action: PA<IBookmark>) =>
			void bookmarksAdapter.addOne(state.bookmarks, action.payload),
		addManyBm: (state, action: PA<IBookmark[]>) =>
			void bookmarksAdapter.addMany(state.bookmarks, action.payload),
		updateBm: (state, action: PA<Update<IBookmark>>) =>
			void bookmarksAdapter.updateOne(state.bookmarks, action.payload),
		removeBm: (state, action: PA<IBookmark>) =>
			void bookmarksAdapter.removeOne(state.bookmarks, action.payload.$id),
	},
	extraReducers: builder => {},
});

export const { actions: bmShelfAction } = bmShelfSlice;
export default bmShelfSlice.reducer;

/** Selectors **/

// export const { selectAll: selectAllFolders } =
// 	foldersAdapter.getSelectors<RootState>(state => state.bmShelf.folders);

// export const { selectAll: selectAllBookmarks } =
// 	bookmarksAdapter.getSelectors<RootState>(state => state.bmShelf.bookmarks);

export const selectFoldersWithBookmarks = createSelector(
	(state: RootState) => state.bmShelf,
	(shelf: TBmShelf) => {
		const bookmarkEntities = shelf.bookmarks.entities;
		const folderEntities = shelf.folders.entities;
		return { folders: convertToDenormalized(folderEntities, bookmarkEntities) }; // denormalizedJson;
	},
);

// TS Types
export interface IBookmark {
	type: "bookmark";
	$id: string;
	parentId: string;
	path: string[];
	level: number;
	title: string;
	url: string;
	$createdAt: string;
	$updatedAt: string;
}

export interface IFolder {
	type: "folder";
	$id: string;
	parentId: string;
	path: string[];
	level: number;
	bookmarks: IBookmark[];
	folders: IFolder[];
	title: string;
	$createdAt: string;
	$updatedAt: string;
}
