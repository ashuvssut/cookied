import { useEffect } from "react";
import { resetReduxPersist_reload } from "app/utils/storage";
import Screen from "app/components/Screen";
import { Header } from "app/components/Header";
import { View, Text } from "dripsy";
import { TreePanel } from "app/screens/HomeScreen/TreePanel";
import { WebpageView } from "app/screens/HomeScreen/WebpageView";

export default function HomeScreen() {
	useEffect(() => {
		window["reset"] = resetReduxPersist_reload;
		// window["addMany"] = execAddMany;
		// window["addMany2"] = execAddManyFl;
		// console.log(JSON.stringify(bookmarkState, null, 2));
	}, []);

	return (
		<Screen>
			<Header />
			<View sx={{ flexDirection: "row",flex:1 }}>
				<View sx={{ flex: 3 }}>
					<TreePanel />
				</View>
				<WebpageView />
			</View>
		</Screen>
	);
}
