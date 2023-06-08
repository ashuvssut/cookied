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

const foldersAdapter = createEntityAdapter<IFolder>({
	selectId: folder => folder.$id,
	// sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const bookmarksAdapter = createEntityAdapter<IBookmark>({
	selectId: bookmark => bookmark.$id,
	// sortComparer: (a, b) => a.title.localeCompare(b.title),
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
	(state: RootState) => state.bmShelf.bookmarks,
	(state: RootState) => state.bmShelf.folders,
	(bookmarks: TBmShelf["bookmarks"], folders: TBmShelf["folders"]) => {
		const bookmarkEntities = bookmarks.entities;
		const folderEntities = folders.entities;
		console.log("bookmarkEntities", bookmarkEntities);
		console.log("folderEntities", folderEntities);

		return [];
		// de-normalize the data for the UI
	},
);
