import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../types";
export interface IBookmark {
	id: string;
	parentId: string;
	pathId: string;
	level: number;
	title: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

export interface IFolder {
	id: string;
	parentId: string;
	pathId: string;
	level: number;
	bookmarks: IBookmark[];
	folders: IFolder[];
	title: string;
	createdAt: string;
	updatedAt: string;
}

export type IBookmarkState = { folders: IFolder[] };
type PA<T extends keyof IBookmarkState> = PayloadAction<IBookmarkState[T]>;

export const bookmarksAdapter = createEntityAdapter({
	selectId: (bookmark: IBookmark) => bookmark.id,
	sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = bookmarksAdapter.getInitialState();

export const bookmarkSlice = createSlice({
	name: "bookmarks",
	initialState,
	reducers: {
		addBookmark: bookmarksAdapter.addOne,
		removeBookmark: bookmarksAdapter.removeOne,
		removeSelectedBookmark: bookmarksAdapter.removeMany,
		updateBookmark: bookmarksAdapter.updateOne,
		setAllBookmarks: bookmarksAdapter.setAll,
	},
	extraReducers: builder => {},
});

export const {
	addBookmark,
	removeBookmark,
	removeSelectedBookmark,
	updateBookmark,
	setAllBookmarks,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;

export const selectBookmarks = (state: RootState) => state.bookmarks;

const bookmarksSelector = bookmarksAdapter.getSelectors(selectBookmarks);
export const { selectIds, selectById, selectEntities, selectTotal, selectAll } =
	bookmarksSelector;
