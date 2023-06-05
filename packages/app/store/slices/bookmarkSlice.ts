import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IBookmark {
	id: string;
	title: string;
	url: string;
	createdAt: string;
	updatedAt: string;
	path: string;
}

export interface IFolder {
	name: string;
	id: string;
	bookmarks: IBookmark[];
	folders: IFolder[]
}

type IBookmarkState = {	folders: IFolder[]}
type PA<T extends keyof IBookmarkState> = PayloadAction<IBookmarkState[T]>;

const initialState: IBookmarkState = {
	folders: []
};

export const bookmarkSlice = createSlice({
	name: "bookmark",
	initialState,
	reducers: {
		// setSomeState(state, action: PA<"someState">) {
		// 	state.someState = action.payload;
		// },
	},
	extraReducers: builder => {},
});

export default bookmarkSlice.reducer;

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
