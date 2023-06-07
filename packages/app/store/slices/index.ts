import { combineReducers } from "@reduxjs/toolkit";
import bookmarkShelfReducer from "./bookmarkSlice";
import folderReducer from "./folderSlice";

const combinedReducer = combineReducers({
	// folders: folderReducer,
	bmShelf: bookmarkShelfReducer,
});
export type TRootReducer = typeof combinedReducer;

export const rootReducer: TRootReducer = (state, action) => {
	switch (action.type) {
		case "USER_LOGOUT":
			return combinedReducer(undefined, action);
		default:
			return combinedReducer(state, action);
	}
};
