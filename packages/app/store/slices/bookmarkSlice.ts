import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBookmarkState {
	// someState: number;
}
type PA<T extends keyof IBookmarkState> = PayloadAction<IBookmarkState[T]>;

const initialState: IBookmarkState = {
	// someState: 1,
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
