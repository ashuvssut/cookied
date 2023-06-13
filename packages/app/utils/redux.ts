import { AppThunk, RootState } from "app/store/types";

export const selectFromState =
	<Selected>(selector: (state: RootState) => Selected): AppThunk<Selected> =>
	(_, getState) =>
		selector(getState());
