import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	EntityState,
	PayloadAction,
	Update,
} from "@reduxjs/toolkit";
import {
	bookmarksAdapter,
	IBookmark,
	removeSelectedBookmark,
	selectBookmarks,
	setAllBookmarks,
} from "./bookmarkSlice";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../types";

export interface IFolderResponse {
	name: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	bookmarks: IBookmark[];
	folders: IFolder[];
	level: number;
	parentFolderId: string | null;
}
export interface IFolder {
	name: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	bookmarks: string[];
	folders: string[];
	level: number;
	parentFolderId: string | null;
}

type IBookmarkState = { folders: IFolder[] };
type PA<T extends keyof IBookmarkState> = PayloadAction<IBookmarkState[T]>;

const foldersAdapter = createEntityAdapter({
	selectId: (folder: IFolder) => folder.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const fetchFolderFromApi = createAsyncThunk(
	"folders/fetchFolders",
	async (_, { dispatch }) => {
		const response: AxiosResponse<IFolderResponse[]> = await axios.get(
			"http://localhost:3004/folders",
		);
		console.log("Response data", response.data);
		const folders: IFolder[] = response.data.map(
			({ bookmarks, folders, ...rootFolder }) => ({
				...rootFolder,
				folders: folders.map(({ id }) => id),
				bookmarks: bookmarks.map(({ id }) => id),
			}),
		);
		const bookmarks = response.data
			.map((folder: IFolderResponse) => {
				return folder.bookmarks.map(bookmark => bookmark);
			})
			.flat();
		dispatch(setAllBookmarks(bookmarks));
		dispatch(setAllFolders(folders));
		return { bookmarks };
	},
);

export const addNewFolderApi = createAsyncThunk(
	"folders/addNewFolder",
	async (folderData, { dispatch }) => {
		const response: AxiosResponse<IFolder> = await axios.post(
			"http://localhost:3004/folders",
			folderData,
		);
		return response.data;
	},
);

export const updateFolderApi = createAsyncThunk(
	"folders/updateFolderApi",
	async (updatedFolderData, { dispatch }) => {
		const response: AxiosResponse<Update<IFolder>> = await axios.patch(
			"http://localhost:3004/folders",
			updatedFolderData,
		);
		return response.data;
	},
);

export const removeOneFolderApi = createAsyncThunk(
	"folders/removeOneFolderApi",
	async (id: string, { dispatch }) => {
		const response: AxiosResponse<Update<IFolder>> = await axios.delete(
			`http://localhost:3004/folders/`,
			{ params: id },
		);
		return { id };
	},
);

export const removeSelectedFolderApi = createAsyncThunk(
	"folders/removeSelectedFolderApi",
	async (ids: string[], { dispatch }) => {
		const response: AxiosResponse<Update<IFolder>> = await axios.delete(
			`http://localhost:3004/folders/`,
			{ params: ids },
		);
		return { ids };
	},
);

// Setting Initial Folder as Favourites and Other Bookmarks
const initialState = foldersAdapter.getInitialState({
	loading: "idle",
});

function isArrayDefined(arr: (string | undefined)[]): boolean {
	return arr.some(item => typeof item !== "undefined");
}

export const folderSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {
		setAllFolders: foldersAdapter.setAll,
		addFolder: foldersAdapter.addOne,
		removeFolder: foldersAdapter.removeOne,
		removeSelectedFolder: foldersAdapter.removeMany,
		updateFolder: foldersAdapter.updateOne,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFolderFromApi.pending, state => {
				state.loading = "loading";
			})
			.addCase(fetchFolderFromApi.fulfilled, (state, { payload }) => {
				state.loading = "success";
			})
			.addCase(fetchFolderFromApi.rejected, state => {
				state.loading = "failed";
			}) 
			.addCase(addNewFolderApi.pending, state => {
				state.loading = "loading";
			})
			.addCase(addNewFolderApi.fulfilled, (state, { payload }) => {
				state.loading = "success";
				addFolder(payload);
			})
			.addCase(addNewFolderApi.rejected, state => {
				state.loading = "failed";
			})
			.addCase(updateFolderApi.pending, state => {
				state.loading = "loading";
			})
			.addCase(updateFolderApi.fulfilled, (state, { payload }) => {
				state.loading = "success";
				updateFolder(payload);
			})
			.addCase(updateFolderApi.rejected, state => {
				state.loading = "failed";
			})
			.addCase(removeOneFolderApi.pending, state => {
				state.loading = "loading";
			})
			.addCase(removeOneFolderApi.fulfilled, (state, { payload }) => {
				state.loading = "success";
				const bookMarksToBeRemoved = state.entities[payload.id]?.bookmarks;
				if (bookMarksToBeRemoved) {
					removeSelectedBookmark(bookMarksToBeRemoved);
				}
				removeFolder(payload.id);
			})
			.addCase(removeOneFolderApi.rejected, state => {
				state.loading = "failed";
			})
			.addCase(removeSelectedFolderApi.pending, state => {
				state.loading = "loading";
			})
			.addCase(removeSelectedFolderApi.fulfilled, (state, { payload }) => {
				state.loading = "success";
				const bookMarksToBeRemoved = payload.ids
					.map(id => state.entities[id]?.bookmarks)
					.flat();
				if (isArrayDefined(bookMarksToBeRemoved)) {
					removeSelectedBookmark(bookMarksToBeRemoved);
				}
				removeSelectedFolder(payload.ids);
			})
			.addCase(removeSelectedFolderApi.rejected, state => {
				state.loading = "failed";
			});
	},
});

export const {
	setAllFolders,
	addFolder,
	removeFolder,
	removeSelectedFolder,
	updateFolder,
} = folderSlice.actions;
export default folderSlice.reducer;

const selectFolders = (state: RootState) => state.folders;

export const selectFoldersWithBookmarks = createSelector(
	selectBookmarks,
	selectFolders,
	(bookmarks: EntityState<IBookmark>, folders: EntityState<IFolder>) => {
		const bookmarkEntities = bookmarks.entities;
		const folderEntities = folders.entities;

		return {
			folders: folders.ids.map(folderId => {
				const folder = folders.entities[folderId];

				return {
					...folder,
					folders: folder
						? folder.folders.map(folderId => folderEntities[folderId])
						: [],
					bookmarks: folder
						? folder.bookmarks.map(bookmarkId => bookmarkEntities[bookmarkId])
						: [],
				};
			}),
		};
	},
);

// folders=[
// 	{
// 	 name:"fav",
// 	 id:"1",
// 	 bookmarks:[{},{},{}],
// 	 subFolders:[{
// 		name:"fav",
// 		id:"1",
// 		bookmarks:[{},{},{}],
// 		subFolders:[{},{},{}]
// 		},
// 		{ }, { }]
// 	},
// 	{
// 		name:"fav",
// 		id:"1",
// 		bookmarks:[{},{},{}],
// 		subFolders:[{
// 		name:"fav",
// 		id:"1",
// 		bookmarks:[{},{},{}],
// 		subFolders:[{},{},{}]
// 		},{},{}]
// 	},
// 	{}
// 	]
