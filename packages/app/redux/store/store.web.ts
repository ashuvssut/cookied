import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "../slices";

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});


export default store