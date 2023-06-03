import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
	dummy: () => "Dummy",
});
export type RootState = ReturnType<typeof rootReducer>;
