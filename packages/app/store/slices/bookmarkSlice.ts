import {
	createEntityAdapter,
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
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const bookmarksAdapter = createEntityAdapter<IBookmark>({
	selectId: bookmark => bookmark.id,
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = {
	bookmarks: bookmarksAdapter.getInitialState(),
	folders: foldersAdapter.getInitialState(),
};
export type IBookmarkShelf = typeof initialState;
export const bookmarkShelfSlice = createSlice({
	name: "bookmarkShelf",
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

export const {} = bookmarkShelfSlice.actions;
export default bookmarkShelfSlice.reducer;

export const {} = bookmarksAdapter.getSelectors<RootState>(
	state => state.bmShelf.bookmarks,
);
