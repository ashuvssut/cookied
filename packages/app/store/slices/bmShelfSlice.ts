// Bookmark Shelf Slice
import {
	createEntityAdapter,
	createSelector,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../types";
import { convertToDenormalized } from "app/store/utils/bmShelfUtils";

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
	sortComparer: (a, b) => a.title.localeCompare(b.title), // TODO: expt:- chech if changin title to something else using jotai to something gives us sort ability or not (else create selectors)
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
		addFolder: (state, action: PayloadAction<IFolder>) =>
			void foldersAdapter.addOne(state.folders, action.payload),
		addBookmark: (state, action: PayloadAction<IBookmark>) =>
			void bookmarksAdapter.addOne(state.bookmarks, action.payload),
		addManyBm: (state, action: PayloadAction<IBookmark[]>) =>
			void bookmarksAdapter.addMany(state.bookmarks, action.payload),
		addManyFl: (state, action: PayloadAction<IFolder[]>) =>
			void foldersAdapter.addMany(state.folders, action.payload),
	},
	extraReducers: builder => {},
});

export const { actions: bmShelfAction } = bmShelfSlice;
export default bmShelfSlice.reducer;

export const {} = bookmarksAdapter.getSelectors<RootState>(
	state => state.bmShelf.bookmarks,
);

/** Selectors */

// export const { selectAll: selectAllFolders } =
// 	foldersAdapter.getSelectors<RootState>(state => state.bmShelf.folders);

// export const { selectAll: selectAllBookmarks } =
// 	bookmarksAdapter.getSelectors<RootState>(state => state.bmShelf.bookmarks);

export const selectFoldersWithBookmarks = createSelector(
	(state: RootState) => state.bmShelf,
	(shelf: TBmShelf) => {
		const bookmarkEntities = shelf.bookmarks.entities;
		const folderEntities = shelf.folders.entities;
		console.log("bookmarkEntities", JSON.stringify(bookmarkEntities, null, 2));
		console.log("folderEntities", JSON.stringify(folderEntities, null, 2));

		return { folders: convertToDenormalized(folderEntities, bookmarkEntities) }; // denormalizedJson;
	},
);
