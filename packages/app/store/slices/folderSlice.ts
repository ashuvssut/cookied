import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { IBookmark } from "./bookmarkSlice";
import axios from "axios";

export interface IFolder {
	name: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	bookmarks: IBookmark[];
	folders: IFolder[];
	level: number;
	parentFolderId: string | null;
}

type IBookmarkState = { folders: IFolder[] };
type PA<T extends keyof IBookmarkState> = PayloadAction<IBookmarkState[T]>;

const foldersAdapter = createEntityAdapter({
	selectId: (folder: IFolder) => folder.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const INITIAL_FOLDER: IFolder[] = [
	{
		name: "Favourites",
		id: "id1",
		createdAt: new Date(),
		updatedAt: new Date(),
		bookmarks: [],
		folders: [],
		level: 0,
		parentFolderId: null,
	},
	{
		name: "Other Bookmarks",
		id: "id2",
		createdAt: new Date(),
		updatedAt: new Date(),
		bookmarks: [],
		folders: [],
		level: 0,
		parentFolderId: null,
	},
];

export const fetchFolderbyUserId = createAsyncThunk(
	"folders/fetchFolders",
	async (_, { dispatch }) => {
		const response = await axios.get("http://localhost:3004/folders");
		console.log(response.data);
    dispatch(setAllFolders(response.data));
		return response.data;
	},
);

// Setting Initial Folder as Favourites and Other Bookmarks
const initialState = foldersAdapter.getInitialState({ loading: "idle" });

export const folderSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {
		setAllFolders: foldersAdapter.setAll,
		addFolder: foldersAdapter.addOne,
		removeFolder: foldersAdapter.removeOne,
		removeSelectedBookmark: foldersAdapter.removeMany,
		updateFolder: foldersAdapter.updateOne,
	},
	extraReducers: builder => {},
});

export const {
	setAllFolders,
	addFolder,
	removeFolder,
	removeSelectedBookmark,
	updateFolder,
} = folderSlice.actions;
export default folderSlice.reducer;

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
