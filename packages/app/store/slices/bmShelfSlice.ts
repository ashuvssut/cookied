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
import { Id } from "gconvex/_generated/dataModel";
import { TBm, TFl } from "gconvex/schema";

const foldersAdapter = createEntityAdapter<IFolder>({
	selectId: folder => folder._id,
	sortComparer: (a, b) => a.title.localeCompare(b.title), // TODO: expt:- check if changin title to something else using jotai to something gives us sort ability or not (else create selectors)
});

const bookmarksAdapter = createEntityAdapter<IBookmark>({
	selectId: bookmark => bookmark._id,
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
			prepare: (folder: Omit<IFolder, "bookmarks" | "folders">) => {
				const draft = { ...folder, bookmarks: [], folders: [] };
				return { payload: draft };
			},
		},
		addManyFl: {
			reducer: (state, action: PA<IFolder[]>) =>
				void foldersAdapter.addMany(state.folders, action.payload),
			prepare: (folders: Omit<IFolder, "bookmarks" | "folders">[]) => ({
				payload: folders //
					.map(folder => ({ ...folder, bookmarks: [], folders: [] })),
			}),
		},
		setAllFl: (state, action: PA<IFolder[]>) =>
			void foldersAdapter.setAll(state.folders, action.payload),
		updateFl: (state, action: PA<Update<IFolder>>) =>
			void foldersAdapter.updateOne(state.folders, action.payload),
		removeFl: (state, action: PA<IFolder>) =>
			void foldersAdapter.removeOne(state.folders, action.payload._id),

		// Bookmark CRUD
		addBm: (state, action: PA<IBookmark>) =>
			void bookmarksAdapter.addOne(state.bookmarks, action.payload),
		addManyBm: (state, action: PA<IBookmark[]>) =>
			void bookmarksAdapter.addMany(state.bookmarks, action.payload),
		setAllBm: (state, action: PA<IBookmark[]>) =>
			void bookmarksAdapter.setAll(state.bookmarks, action.payload),
		updateBm: (state, action: PA<Update<IBookmark>>) =>
			void bookmarksAdapter.updateOne(state.bookmarks, action.payload),
		removeBm: (state, action: PA<IBookmark>) =>
			void bookmarksAdapter.removeOne(state.bookmarks, action.payload._id),
	},
	extraReducers: builder => {},
});

export const { actions: bmShelfAction } = bmShelfSlice;
export default bmShelfSlice.reducer;

/** Selectors **/
export const { selectById: selectFlId } =
	foldersAdapter.getSelectors<RootState>(s => s.bmShelf.folders);

export const {
	selectById: selectBmId,
	selectAll: selectAllBm,
	selectEntities: selectAllBmEntities,
} = bookmarksAdapter.getSelectors<RootState>(s => s.bmShelf.bookmarks);

export const selectDenormalizedBmShelf = createSelector(
	(state: RootState) => state.bmShelf,
	shelf => {
		const bookmarkEntities = shelf.bookmarks.entities;
		const folderEntities = shelf.folders.entities;
		// console.log(convertToDenormalized(folderEntities, bookmarkEntities));
		return { folders: convertToDenormalized(folderEntities, bookmarkEntities) }; // denormalizedJson;
	},
);

export const selectFlPaths = createSelector(
	(state: RootState) => state.bmShelf.folders,
	folders => {
		const folderEntities = folders.entities;
		const flPaths = Object.values(folderEntities).map(folder => {
			// if (!folder) logr.warn("selectFlPaths: folder is undefined");
			if (!folder) return [];
			const folderPath = [...folder.path];
			if (folder._id) folderPath.push(folder._id); // add folder's own id to pathArr too
			return folderPath;
		});
		return flPaths;
	},
);

export type TFlPathWithTitle = {
	path: string;
	id: string;
	pathArr: string[];
};
export const selectFlPathWithTitleArray = createSelector(
	selectFlPaths,
	(state: RootState) => state.bmShelf.folders,
	(paths, folders): TFlPathWithTitle[] => {
		const folderEntities = folders.entities;
		// convert path id array to their respective path title array
		const flPathsWithTitles = paths.map(path => {
			const pathCopy = [...path].slice(1); // slice(1) removes "root" from path array
			const titlePathArr = pathCopy.map(id => {
				const folder = folderEntities[id];
				// if (!folder) logr.warn("selectFlPathsWithTitles: folder is undefined");
				return folder?.title || "";
			});
			const id = path[path.length - 1]!; // last id is the folder's id (see selectFlPaths)
			pathCopy.unshift("root"); // add "root" to beginning of array
			return { path: titlePathArr.join("/"), id, pathArr: pathCopy };
		});
		return flPathsWithTitles;
	},
);
export const selectFlPathWithTitleByFlId = createSelector(
	selectFlPathWithTitleArray,
	(_s: RootState, flId: string | null) => flId,
	(flPathWithTitlesArr, flId) => {
		if (!flId) return undefined;
		return flPathWithTitlesArr.find(fl => fl.id === flId);
	},
);

export const selectFlPathWithTitleByBmId = createSelector(
	selectFlPathWithTitleArray,
	(state: RootState) => state.bmShelf.bookmarks,
	(_s: RootState, bmId: string | null) => bmId,
	(flPathWithTitlesArr, bookmarks, bmId) => {
		if (!bmId) return undefined;
		const bm = bookmarks.entities[bmId];
		if (!bm) return undefined;
		const flId = bm.parentId;
		return flPathWithTitlesArr.find(fl => fl.id === flId);
	},
);

// TS Types
export interface IBookmark extends Omit<TBm, "userId"> {
	_id: Id<"bookmarks">;
	_creationTime?: number;
	userId?: string;
}
export interface IBookmarkNode extends IBookmark {}

// TFl has folder & bookmarks array of string[] because they store document ids in those string[]
// IFolderNode  has folder & bookmarks array of IFolder[] & IBookmark[] resp. because they store the whole node/leaf object array. They are used in rendering TreeView
export interface IFolder extends Omit<TFl, "userId"> {
	_id: Id<"folders">;
	_creationTime?: number;
	userId?: string;
}
export interface IFolderNode extends Omit<IFolder, "folders" | "bookmarks"> {
	folders: IFolderNode[];
	bookmarks: IBookmarkNode[];
}
