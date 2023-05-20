import React from "react";
import { Slot } from "expo-router";

import { Provider } from "../contexts/authContext";

export default function Root() {
	return (
		// Setup the auth context and render our layout inside of it.
		<Provider>
			<Slot />
		</Provider>
	);
}
